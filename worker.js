export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Test the backend connection
    if (url.pathname === "/api/test") {
      try {
        const result = await env.DB
          .prepare("SELECT name FROM sqlite_master WHERE type = 'table' ORDER BY name")
          .all();

        return Response.json({
          success: true,
          message: "OneStop Trading backend is connected!",
          tables: result.results
        });
      } catch (error) {
        return Response.json(
          {
            success: false,
            error: error.message
          },
          { status: 500 }
        );
      }
    }

    // Serve the existing website
    return env.ASSETS.fetch(request);
  }
};
