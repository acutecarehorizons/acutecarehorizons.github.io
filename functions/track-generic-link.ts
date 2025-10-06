interface TrackGenericLinkPayload {
  visitorId?: string;
  linkType: 'amazon' | 'google_play' | 'apple';
  destination: string;
  withGeo: boolean;
}

export async function onRequestPost(context: { request: any; env: any; }) {
  const { request, env } = context;

  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  const payload: TrackGenericLinkPayload = await request.json();

  let geolocation_json: string | null = null;
  if (payload.withGeo) {
    try {
      // Get IP address from headers (only for geolocation, not stored)
      const ip = request.headers.get('x-forwarded-for') || request.headers.get('cf-connecting-ip') || '';
      const cleanIp = ip && ip.includes(',') ? ip.split(',')[0].trim() : ip;
      const geoRes = await fetch(`https://free.freeipapi.com/api/json/${cleanIp}`);
      if (geoRes.ok) {
        geolocation_json = JSON.stringify(await geoRes.json());
      }
    } catch (e) {
      // If geolocation fails, just continue without it
      geolocation_json = null;
    }
  }

  // Insert or ignore visitor
  if (payload.visitorId) {
    await env.DB.prepare(
      `INSERT OR IGNORE INTO visitors (id, created_at) VALUES (?, strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`
    ).bind(payload.visitorId).run();
  }

  // Insert or ignore generic link
  await env.DB.prepare(
    `INSERT OR IGNORE INTO links (book_id, link_type, url, created_at) VALUES (?, ?, ?, strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`
  ).bind(`generic_${payload.linkType}`, payload.linkType, payload.destination).run();

  // Get link_id
  const linkRow = await env.DB.prepare(
    `SELECT id FROM links WHERE book_id = ? AND link_type = ?`
  ).bind(`generic_${payload.linkType}`, payload.linkType).first();
  const linkId = linkRow?.id;

  // Insert click (without IP address or user agent)
  await env.DB.prepare(
    `INSERT INTO link_clicks (visitor_id, link_id, geolocation_json, created_at)
     VALUES (?, ?, ?, strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`
  ).bind(
    payload.visitorId || null,
    linkId,
    geolocation_json
  ).run();

  return new Response('OK', { status: 200 });
} 