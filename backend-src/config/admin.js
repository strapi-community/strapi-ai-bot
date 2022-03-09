module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'd04dd1c9bd28fdf2e24ec3584ef93cb5'),
  },
});
