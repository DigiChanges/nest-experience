import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './App/AppModule';
import { RequestMethod } from '@nestjs/common';
import compression from '@fastify/compress';
import qs from 'fastify-qs';

void (async() =>
{
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );

  app.setGlobalPrefix('api', {
    exclude: [{ path: '/', method: RequestMethod.GET }]
  });

  await app.register(compression);
  await app.register(qs);

  await app.listen(8089);
})();
