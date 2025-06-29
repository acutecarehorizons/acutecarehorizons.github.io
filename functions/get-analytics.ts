function parseBasicAuth(authHeader) {
  if (!authHeader || !authHeader.startsWith('Basic ')) return null;
  const base64 = authHeader.slice(6);
  try {
    const [username, password] = atob(base64).split(':');
    return { username, password };
  } catch {
    return null;
  }
}

async function sha256(str) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str));
  return Array.from(new Uint8Array(buf)).map(x => x.toString(16).padStart(2, '0')).join('');
}


export async function onRequestGet(context) {
  const { env, request } = context;
  const authHeader = request.headers.get('Authorization');
  const creds = parseBasicAuth(authHeader);
  if (!creds || creds.username !== 'admin') {
    return new Response('Unauthorized', { status: 401, headers: { 'WWW-Authenticate': 'Basic' } });
  }
  const hash = await sha256(creds.password);
  if (hash !== env.analytics_pass) {
    return new Response('Unauthorized', { status: 401, headers: { 'WWW-Authenticate': 'Basic' } });
  }

  // Get time period from query string (in days), default 30
  const url = new URL(request.url);
  const days = parseInt(url.searchParams.get('days') || '30', 10);
  // Calculate start date string in ISO format
  const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();

  // Get total clicks per book_id/link_type for the period
  const result = await env.DB.prepare(
    `SELECT links.book_id, links.link_type, COUNT(*) as clicks
     FROM links
     JOIN link_clicks ON links.id = link_clicks.link_id
     WHERE link_clicks.created_at >= ?
     GROUP BY links.book_id, links.link_type`
  ).bind(startDate).all();
  return new Response(JSON.stringify(result.results), {
    headers: { 'Content-Type': 'application/json' }
  });
}

export async function onRequestPost() {
  return new Response('Method Not Allowed', { status: 405 });
} 