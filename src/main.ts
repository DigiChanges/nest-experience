import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './App/AppModule';
import { RequestMethod } from '@nestjs/common';
import compression from '@fastify/compress';
import { CommandFactory } from 'nest-commander';

void (async() =>
{
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );

  app.setGlobalPrefix('api', {
    exclude: [{ path: '/', method: RequestMethod.GET }]
  });

  // await CommandFactory.run(AppModule);
  await app.register(compression);
  await app.listen(8089);
})();
