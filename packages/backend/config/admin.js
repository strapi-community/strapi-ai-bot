module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET'),
    options: {
      expiresIn: env('ADMIN_EXPIRE', '7d')
    }
  },
  apiToken: {
    salt: env('API_TOKEN_SALT'),
  },
  autoOpen: false,
  watchIgnoreFiles: [
    '**/config/sync/**',
  ],
});
