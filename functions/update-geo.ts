interface UpdateGeoPayload {
    visitorId: string;
    recordId: number;
    ip: string;
}

export async function onRequestPost(context) {
  const { request, env } = context;
  const payload: UpdateGeoPayload = await request.json();

  let geolocation_json: string | null = null;

  try {
    const geoRes = await fetch(`https://free.freeipapi.com/api/json/${payload.ip}`);
    if (geoRes.ok) {
      geolocation_json = JSON.stringify(await geoRes.json());
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