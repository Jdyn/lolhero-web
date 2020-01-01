module.exports = {
  experimental: { css: true },
  poweredByHeader: false,
  target: 'serverless',
  env: {
    IS_PROD: process.env.NODE_ENV === 'production' ? true : false,
    API_URL:
      process.env.NODE_ENV === 'production'
        ? 'https://lolhero.gg/api/v1'
        : 'http://localhost:4000/api/v1'
  }
};
