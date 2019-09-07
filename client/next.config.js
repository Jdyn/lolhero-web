// @ts-nocheck
/* eslint-disable */
const withCSS = require('@zeit/next-css');

module.exports = withCSS({
  target: 'serverless',
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: '[local]___[hash:base64:5]'
  }
});