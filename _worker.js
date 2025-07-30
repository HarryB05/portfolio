export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    // Try to get the asset first
    const response = await env.ASSETS.fetch(request);
    
    // If the asset exists, return it
    if (response.status !== 404) {
      return response;
    }
    
    // If asset doesn't exist, try to serve 404.html
    const notFoundRequest = new Request(
      new URL('/404.html', request.url).href,
      request
    );
    
    const notFoundResponse = await env.ASSETS.fetch(notFoundRequest);
    
    // Return 404.html with proper 404 status code
    return new Response(notFoundResponse.body, {
      status: 404,
      statusText: 'Not Found',
      headers: notFoundResponse.headers
    });
  }
};