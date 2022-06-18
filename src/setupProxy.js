const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    ["/api", "/data"], // You can pass in an array too eg. ['/api', '/another/path']
    // createProxyMiddleware({
    //   target: "http://localhost:4000",

    //   changeOrigin: true,
    // })
    createProxyMiddleware({
      target:
        // not true if environment variables have booleans...
        process.env.BACKENDLOCAL === "true" || process.env.BACKENDLOCAL
          ? "http://localhost:4000"
          : "https://api.wishtender.com/",
      changeOrigin: true,
      secure: false,
      // must match your local dev env
      cookieDomainRewrite: "localhost",
      preserveHeaderKeyCase: true,
      headers: {
        Origin: "https://www.wishtender.com",
      },
      on: {
        // remove secure mode from cookie
        onProxyRes: (proxyRes, req, res) => {
          const sc = proxyRes.headers["set-cookie"];
          if (Array.isArray(sc)) {
            proxyRes.headers["set-cookie"] = sc.map((sc) => {
              return sc
                .split(";")
                .filter((v) => v.trim().toLowerCase() !== "secure")
                .join("; ");
            });
          }
        },
      },
    })
  );
};
