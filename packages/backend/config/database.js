module.exports = ({ env }) => {
  if(env.bool('USE_PG') === true) {
    return {
      connection: {
        client: 'postgres',
        connection: {
          host: env('DATABASE_HOST', '127.0.0.1'),
          port: env.int('DATABASE_PORT', 5432),
          database: env('DATABASE_NAME', 'strapi'),
          user: env('DATABASE_USERNAME', 'strapi'),
          password: env('DATABASE_PASSWORD', 'strapi'),
          schema: env('DATABASE_SCHEMA', 'public'),
          ssl: false,
        },
        debug: env.bool('DATABASE_DEBUG', false),
      },
    }
  } else {
    return {
      connection: {
        client: 'sqlite',
        connection: {
          filename: '.tmp/data.db',
        },
        useNullAsDefault: true,
        debug: env.bool('DATABASE_DEBUG', false),
      },
    }
  }
};

