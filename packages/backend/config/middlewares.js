let sourceLocations = {
  'connect-src': ["'self'", 'https:'],
  'img-src': ["'self'", 'data:', 'blob:'],
  'media-src': ["'self'", 'data:', 'blob:'],
  upgradeInsecureRequests: null,
}

// TODO: Dynamically add additional src based on upload provider settings

module.exports = [
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: sourceLocations,
      },
    },
  },
  'strapi::cors',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
