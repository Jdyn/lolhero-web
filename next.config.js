module.exports = {
  experimental: { css: true },
  poweredByHeader: false,
  env: {
    IS_PROD: process.env.NODE_ENV === 'production',
    API_URL:
      process.env.NODE_ENV === 'production'
        ? 'https://lolhero.gg/api/v1'
        : 'http://localhost:4000/api/v1'
  }
};
