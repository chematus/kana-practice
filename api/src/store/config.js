export default {
  passport: {
    secret: process.env.PASSPORT_SECRET || '',
    expiresIn: process.env.PASSPORT_EXPIRE || 36000,
  },
  env: {
    salt: process.env.SALT || 10,
    port: process.env.PORT || 8000,
    mongoURI: process.env.MONGO_URI || '',
  },
  sentry: {
    dsn: process.env.SENTRY_DSN,
    level: process.env.SENTRY_LEVEL || 'info',
  },
};
