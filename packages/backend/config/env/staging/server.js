module.exports = ({ env }) => ({
  url: env('STAGING_API_URL'),
  proxy: true,
});
