import 'dotenv/config';

export const env = {
  NODE_ENV: process.env.NODE_ENV ?? 'development',
  PORT: Number(process.env.PORT ?? 5000),
  JWT_SECRET: process.env.JWT_SECRET ?? 'dev-secret',
  DATABASE_URL: process.env.DATABASE_URL ?? 'mongodb://localhost:27017/Caarobar',
  // Development bypass configuration
  DEV_BYPASS_ENABLED: process.env.DEV_BYPASS_ENABLED === 'true',
  DEV_BYPASS_IDENTIFIER: process.env.DEV_BYPASS_IDENTIFIER ?? '9999999999',
  DEV_BYPASS_NAME: process.env.DEV_BYPASS_NAME ?? 'Dev Tester'
} as const;

