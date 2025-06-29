interface UpdateGeoPayload {
    visitorId: string;
    recordId: number;
}

export async function onRequestPost(context) {
  const { request, env } = context;
  const payload: UpdateGeoPayload = await request.json();

  // Get IP address from headers
  let ip = request.headers.get('x-forwarded-for') || request.headers.get('cf-connecting-ip') || '';
  if (ip && ip.includes(',')) ip = ip.split(',')[0].trim();

  let geolocation_json: string | null = null;

  try {
    const geoRes = await fetch(`https://free.freeipapi.com/api/json/${ip}`);
    if (geoRes.ok) {
      const geo = await geoRes.json();
      // Only keep minimal fields
      const minimalGeo = {
        latitude: geo.latitude,
        longitude: geo.longitude,
        countryCode: geo.countryCode,
        cityName: geo.cityName,
        regionName: geo.regionName
      };
      geolocation_json = JSON.stringify(minimalGeo);
    }
  } catch (e) {
    geolocation_json = null;
  }

  // Update all visits for this visitor
  await env.DB.prepare(
    `UPDATE visits SET geolocation_json = ? WHERE visitor_id = ?`
  ).bind(
    geolocation_json,
    payload.visitorId
  ).run();

  // Update all link clicks for this visitor
  await env.DB.prepare(
    `UPDATE link_clicks SET geolocation_json = ? WHERE visitor_id = ?`
  ).bind(
    geolocation_json,
    payload.visitorId
  ).run();

  return new Response('OK', { status: 200 });
}