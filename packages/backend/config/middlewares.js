let sourceLocations = {
  'connect-src': ["'self'", 'https:'],
  'img-src': ["'self'", 'data:', 'blob:'],
  'media-src': ["'self'", 'data:', 'blob:'],
  upgradeInsecureRequests: null,
}

if (process.env.UPLOAD_PROVIDER_ENABLED == true) {
  let bucket = `${AWS_BUCKET}.s3.${AWS_REGION}.amazonaws.com`;
  sourceLocations['img-src'].push(bucket);
  sourceLocations['media-src'].push(bucket);
}

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
