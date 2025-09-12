process.loadEnvFile();

export default {
  db: {
    postgres: {
      host: process.env.POSTGRES_HOST,
      user: process.env.POSTGRES_USER,
      pass: process.env.POSTGRES_PASS,
      name: process.env.POSTGRES_DATABASE,
      port: process.env.POSTGRES_PORT
    },
    redis: {
      url: 'redis://127.0.0.1:6379'
    }
  },
  app: {
    port: process.env.APP_PORT || 3000,
    saltOrRounds: process.env.SALT_ROUNDS || 10,
    secret_jwt_key: process.env.SECRET_JWT_KEY,
    access_token_expire_in: process.env.ACCESS_TOKEN_EXPIRE_IN,
    cookie_access_token_expire_in: process.env.COOKIE_ACCESS_TOKEN_EXPIRE_IN,
    cookie_access_token_secure: process.env.COOKIE_ACCESS_TOKEN_SECURE
  },
  cors: {
    validOrigins: process.env.CORS_ORIGINS
      ? process.env.CORS_ORIGINS.split(',')
      : []
  }
};
