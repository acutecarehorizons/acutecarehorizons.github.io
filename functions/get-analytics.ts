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

  // Get total visit count for the period
  const visitCount = await env.DB.prepare(
    `SELECT COUNT(*) as count
     FROM visits
     WHERE created_at >= ?`
  ).bind(startDate).first();

  // Get link clicks grouped by book_id and link_type
  const linkClicksSummary = await env.DB.prepare(
    `SELECT links.book_id, links.link_type, COUNT(*) as count
     FROM link_clicks
     JOIN links ON links.id = link_clicks.link_id
     WHERE link_clicks.created_at >= ?
     GROUP BY links.book_id, links.link_type
     ORDER BY links.book_id, links.link_type`
  ).bind(startDate).all();

  // Get unique geolocations from visits table
  const visitGeolocations = await env.DB.prepare(
    `SELECT DISTINCT geolocation_json
     FROM visits
     WHERE created_at >= ? AND geolocation_json IS NOT NULL AND geolocation_json != ''`
  ).bind(startDate).all();

  // Get unique geolocations from link_clicks table
  const linkClickGeolocations = await env.DB.prepare(
    `SELECT DISTINCT geolocation_json
     FROM link_clicks
     WHERE created_at >= ? AND geolocation_json IS NOT NULL AND geolocation_json != ''`
  ).bind(startDate).all();

  // Combine and deduplicate geolocations
  const allGeolocations = new Set();
  const uniqueGeolocations: Array<{
    latitude: number;
    longitude: number;
    cityName: string;
    regionName: string;
    countryCode: string;
    countryName: string;
  }> = [];

  [...visitGeolocations.results, ...linkClickGeolocations.results].forEach(row => {
    if (row.geolocation_json && !allGeolocations.has(row.geolocation_json)) {
      allGeolocations.add(row.geolocation_json);
      try {
        const geo = JSON.parse(row.geolocation_json);
        if (geo.latitude && geo.longitude) {
          uniqueGeolocations.push({
            latitude: geo.latitude,
            longitude: geo.longitude,
            cityName: geo.cityName || '',
            regionName: geo.regionName || '',
            countryCode: geo.countryCode || '',
            countryName: geo.countryName || ''
          });
        }
      } catch (e) {
        // Skip invalid JSON
      }
    }
  });

  return new Response(JSON.stringify({
    summary: {
      totalVisits: visitCount.count,
      linkClicksByBook: linkClicksSummary.results
    },
    geolocations: uniqueGeolocations
  }), {
    headers: { 'Content-Type': 'application/json' }
  });
}

export async function onRequestPost() {
  return new Response('Method Not Allowed', { status: 405 });
} 
