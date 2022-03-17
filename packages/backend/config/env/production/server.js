module.exports = ({ env }) => ({
  url: env('PUBLIC_API_URL'),
  proxy: true,
});
