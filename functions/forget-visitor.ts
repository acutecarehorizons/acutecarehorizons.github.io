interface ForgetVisitorPayload {
  visitorId: string;
}

export async function onRequestPost(context) {
  const { request, env } = context;
  
  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  const payload: ForgetVisitorPayload = await request.json();

  if (!payload.visitorId) {
    return new Response(JSON.stringify({ 
      success: false, 
      error: 'Visitor ID is required' 
    }), { 
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    // Delete all visits for this visitor
    await env.DB.prepare(
      `DELETE FROM visits WHERE visitor_id = ?`
    ).bind(payload.visitorId).run();

    // Delete all link clicks for this visitor
    await env.DB.prepare(
      `DELETE FROM link_clicks WHERE visitor_id = ?`
    ).bind(payload.visitorId).run();

    // Delete the visitor record
    await env.DB.prepare(
      `DELETE FROM visitors WHERE id = ?`
    ).bind(payload.visitorId).run();

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'All data for this visitor has been deleted' 
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