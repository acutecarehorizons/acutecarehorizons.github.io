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
  if (hash !== env.analitics_pass) {
    return new Response('Unauthorized', { status: 401, headers: { 'WWW-Authenticate': 'Basic' } });
  }
  // Get total clicks per book/linkType
  const result = await env.DB.prepare(
    `SELECT url, COUNT(*) as clicks FROM links
     JOIN link_clicks ON links.id = link_clicks.link_id
     GROUP BY url`
  ).all();
  return new Response(JSON.stringify(result.results), {
    headers: { 'Content-Type': 'application/json' }
  });
}

export async function onRequestPost() {
  return new Response('Method Not Allowed', { status: 405 });
} 