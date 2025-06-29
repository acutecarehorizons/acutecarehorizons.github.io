interface UpdateGeoPayload {
    visitorId: string;
    type: 'visit' | 'click';
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
  
    let table = payload.type === 'visit' ? 'visits' : 'link_clicks';
  
    await env.DB.prepare(
      `UPDATE ${table} SET geolocation_json = ? WHERE id = ? AND visitor_id = ?`
    ).bind(
      geolocation_json,
      payload.recordId,
      payload.visitorId
    ).run();
  
    return new Response('OK', { status: 200 });
  }