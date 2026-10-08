export default {
  async fetch(request, env) {
    const header = request.headers.get("Authorization") || "";
    const [scheme, encoded] = header.split(" ");

    if (scheme === "Basic" && encoded) {
      const decoded = atob(encoded);
      const idx = decoded.indexOf(":");
      if (env.USERNAME && env.PASSWORD && decoded.slice(0, idx) === env.USERNAME && decoded.slice(idx + 1) === env.PASSWORD) {
        return env.ASSETS.fetch(request);
      }
    }

    return new Response("인증이 필요합니다", {
      status: 401,
      headers: { "WWW-Authenticate": 'Basic realm="singing-optic", charset="UTF-8"' },
    });
  },
};
