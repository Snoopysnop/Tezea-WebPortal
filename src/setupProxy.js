const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://148.60.11.163:80/api',
      changeOrigin: true,
    })
  );
  app.use(
    '/realms/Tezea/protocol/openid-connect/token',
    createProxyMiddleware({
      target: 'http://148.60.11.163:8080/realms/Tezea/protocol/openid-connect/token',
      changeOrigin: true,
    })
  );
};