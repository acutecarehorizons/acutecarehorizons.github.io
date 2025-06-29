// src/worker.ts

// Add D1Database type for Cloudflare Workers
// Remove this if you have the actual type from Cloudflare
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type D1Database = any;

export interface Env {
    DB: D1Database;
  }
  
  interface TrackLinkPayload {
    visitorId?: string;
    bookId: string;
    linkType: 'amazon' | 'google';
    userAgent: string;
    withGeo: boolean;
  }
  
  export async function onRequestPost(context) {
    const { request, env } = context;
  
    if (request.method !== 'POST') {
      return new Response('Method Not Allowed', { status: 405 });
    }
  
    const payload: TrackLinkPayload = await request.json();
  
    let geolocation_json: string | null = null;
    let ip: string | null = null;
    if (payload.withGeo) {
      try {
        // Get IP address from headers
        ip = request.headers.get('x-forwarded-for') || request.headers.get('cf-connecting-ip') || '';
        if (ip && ip.includes(',')) ip = ip.split(',')[0].trim();
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
    await env.DB.prepare(
      `INSERT OR IGNORE INTO links (book_id, link_type, url, created_at) VALUES (?, ?, ?, strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`
    ).bind(payload.bookId, payload.linkType, `${payload.bookId}:${payload.linkType}`).run();
  
    // Get link_id
    const linkRow = await env.DB.prepare(
      `SELECT id FROM links WHERE book_id = ? AND link_type = ?`
    ).bind(payload.bookId, payload.linkType).first();
    const linkId = linkRow?.id;
  
    // Insert click
    await env.DB.prepare(
      `INSERT INTO link_clicks (visitor_id, link_id, ip_address, user_agent, geolocation_json, created_at)
       VALUES (?, ?, ?, ?, ?, strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`
    ).bind(
      payload.visitorId || null,
      linkId,
      ip || null,
      payload.userAgent,
      geolocation_json
    ).run();
  
    return new Response('OK', { status: 200 });
  }