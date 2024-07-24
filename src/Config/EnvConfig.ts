import * as process from 'node:process';

export const envConfig = {
  AUTH_HOST: process.env.AUTH_HOST,
  AUTH_API_KEY: process.env.AUTH_API_KEY,
  MONGO_URI: process.env.MONGO_URI
} as const;
