const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:80/api',
      changeOrigin: true,
    })
  );
  app.use(
    '/realms/Tezea/protocol/openid-connect/token',
    createProxyMiddleware({
      target: 'http://localhost:8080/realms/Tezea/protocol/openid-connect/token',
      changeOrigin: true,
    })
  );
  app.use(
    '/auth',
    createProxyMiddleware({
      target: 'http://localhost:8080',
      changeOrigin: true,
    })
  );
};