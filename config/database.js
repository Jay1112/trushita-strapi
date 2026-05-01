module.exports = ({ env }) => {
  const client = 'postgres';

  const connection = env('DATABASE_URL')
    ? {
      connectionString: env('DATABASE_URL'),
      ssl: {
        rejectUnauthorized: env.bool('DATABASE_SSL_SELF_SIGNED', false),
      },
    }
    : {
      host: env('DATABASE_HOST', '127.0.0.1'),
      port: env.int('DATABASE_PORT', 5432),
      database: env('DATABASE_NAME', 'strapi'),
      user: env('DATABASE_USERNAME', 'strapi'),
      password: env('DATABASE_PASSWORD', 'strapi'),
      ssl: env.bool('DATABASE_SSL', true)
        ? { rejectUnauthorized: env.bool('DATABASE_SSL_SELF_SIGNED', false) }
        : false,
    };

  return {
    connection: {
      client,
      connection,
      pool: {
        min: env.int('DATABASE_POOL_MIN', 2),
        max: env.int('DATABASE_POOL_MAX', 10),
      },
    },
  };
};