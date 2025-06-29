// src/worker.ts

export interface Env {
    DB: D1Database;
  }
  
  interface TrackLinkPayload {
    visitorId?: string;
    bookId: string;
    linkType: 'amazon' | 'google';
    userAgent: string;
    ip: string;
    withGeo: boolean;
  }
  
  export async function onRequestPost(context) {
    const { request, env } = context;
  
    if (request.method !== 'POST') {
      return new Response('Method Not Allowed', { status: 405 });
    }
  
    const payload: TrackLinkPayload = await request.json();
  
    let geolocation_json: string | null = null;
  
    if (payload.withGeo && payload.ip) {
      try {
        const geoRes = await fetch(`https://free.freeipapi.com/api/json/${payload.ip}`);
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
  
    // Insert or ignore link
    const linkKey = `${payload.bookId}:${payload.linkType}`;
    await env.DB.prepare(
      `INSERT OR IGNORE INTO links (url, created_at) VALUES (?, strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`
    ).bind(linkKey).run();
  
    // Get link_id
    const linkRow = await env.DB.prepare(
      `SELECT id FROM links WHERE url = ?`
    ).bind(linkKey).first();
    const linkId = linkRow?.id;
  
    // Insert click
    await env.DB.prepare(
      `INSERT INTO link_clicks (visitor_id, link_id, ip_address, user_agent, geolocation_json, created_at)
       VALUES (?, ?, ?, ?, ?, strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`
    ).bind(
      payload.visitorId || null,
      linkId,
      payload.ip,
      payload.userAgent,
      geolocation_json
    ).run();
  
    return new Response('OK', { status: 200 });
  }