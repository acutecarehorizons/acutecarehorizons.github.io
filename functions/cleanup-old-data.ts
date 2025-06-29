interface CleanupPayload {
  days?: number;
  months?: number;
  years?: number;
}

export async function onRequestPost(context) {
  const { request, env } = context;
  
  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  const payload: CleanupPayload = await request.json();
  
  // Default to 2 years if no parameters provided
  let timeOffset = '-2 years';
  
  if (payload.days || payload.months || payload.years) {
    const parts: string[] = [];
    if (payload.years) parts.push(`-${payload.years} years`);
    if (payload.months) parts.push(`-${payload.months} months`);
    if (payload.days) parts.push(`-${payload.days} days`);
    timeOffset = parts.join(' ');
  }

  try {
    // Delete old visits
    const visitsResult = await env.DB.prepare(
      `DELETE FROM visits WHERE created_at < datetime('now', ?)`
    ).bind(timeOffset).run();

    // Delete old link clicks
    const clicksResult = await env.DB.prepare(
      `DELETE FROM link_clicks WHERE created_at < datetime('now', ?)`
    ).bind(timeOffset).run();

    // Delete orphaned visitors (no remaining visits or clicks)
    const visitorsResult = await env.DB.prepare(
      `DELETE FROM visitors WHERE id NOT IN (
        SELECT DISTINCT visitor_id FROM visits 
        UNION 
        SELECT DISTINCT visitor_id FROM link_clicks
      )`
    ).run();

    return new Response(JSON.stringify({ 
      success: true, 
      message: `Old data cleaned up successfully`,
      details: {
        timeOffset,
        visitsDeleted: visitsResult.changes,
        clicksDeleted: clicksResult.changes,
        visitorsDeleted: visitorsResult.changes
      }
    }), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message 
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
} 