const path = require('path');
const withSass = require('@zeit/next-sass');
require('dotenv').config();

module.exports = withSass({
  target: 'serverless',
  env: {
    API_URL: process.env.API_URL,
    JOB_API_KEY: process.env.JOB_API_KEY,
    FAUNADB_READONLY_API_KEY: process.env.FAUNADB_READONLY_API_KEY,
    FAUNADB_WRITE_API_KEY: process.env.FAUNADB_WRITE_API_KEY,
    ELASTICSEARCH_URL: process.env.ELASTICSEARCH_URL,
  },
  sassLoaderOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  webpack(config) {
    config.resolve.alias.pages = path.join(__dirname, 'pages');
    config.resolve.alias.components = path.join(__dirname, 'components');
    config.resolve.alias.lib = path.join(__dirname, 'lib');
    config.resolve.alias.styles = path.join(__dirname, 'styles');
    return config;
  },
});
