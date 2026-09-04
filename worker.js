export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/test") {
      return new Response("ONESTOP WORKER IS RUNNING", {
        headers: {
          "content-type": "text/plain"
        }
      });
    }

    return env.ASSETS.fetch(request);
  }
};
