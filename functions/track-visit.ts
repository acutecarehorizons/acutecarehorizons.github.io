interface TrackVisitPayload {
    visitorId?: string;
    withGeo: boolean;
  }
  
  export async function onRequestPost(context) {
    const { request, env } = context;
    const payload: TrackVisitPayload = await request.json();
  
    let geolocation_json: string | null = null;
    if (payload.withGeo) {
        // Get IP address from headers (only for geolocation, not stored)
        const ip = request.headers.get('x-forwarded-for') || request.headers.get('cf-connecting-ip') || '';
        const cleanIp = ip && ip.includes(',') ? ip.split(',')[0].trim() : ip;
        try {
            const geoRes = await fetch(`https://free.freeipapi.com/api/json/${cleanIp}`);
            if (geoRes.ok) {
            geolocation_json = JSON.stringify(await geoRes.json());
            }
        } catch (e) {
            geolocation_json = null;
        }
    }
  
    // Insert or ignore visitor
    if (payload.visitorId) {
      await env.DB.prepare(
        `INSERT OR IGNORE INTO visitors (id, created_at) VALUES (?, strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`
      ).bind(payload.visitorId).run();
    }
  
    // Insert visit (without IP address or user agent)
    await env.DB.prepare(
      `INSERT INTO visits (visitor_id, geolocation_json, created_at)
       VALUES (?, ?, strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`
    ).bind(
      payload.visitorId || null,
      geolocation_json
    ).run();
  
    return new Response('OK', { status: 200 });
  }