import * as process from 'node:process';

import { registerAs } from '@nestjs/config';
import Joi from 'joi';

export const EnvConfig =  registerAs('app', () => ({
  AUTH_HOST: process.env.AUTH_HOST,
  AUTH_API_KEY: process.env.AUTH_API_KEY,
  DB_URI: process.env.DB_URI,
  JWT_ISS: process.env.JWT_ISS,
  JWT_AUD: process.env.JWT_AUD,
  JWT_SECRET: process.env.JWT_SECRET
}));

export const EnvSchema = Joi.object({
  AUTH_HOST: Joi.string().required(),
  AUTH_API_KEY: Joi.string().required(),
  DB_URI: Joi.string().uri().required(),
  JWT_ISS: Joi.string().required(),
  JWT_AUD: Joi.string().required(),
  JWT_SECRET: Joi.string().required()
});

