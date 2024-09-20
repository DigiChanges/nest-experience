import compression from '@fastify/compress';
import { RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ModuleDefinition } from '@nestjs/core/interfaces/module-definition.interface';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { Test, TestingModule } from '@nestjs/testing';
import { EnvConfig, EnvSchema } from '@src/Config/EnvConfig';
import qs from 'fastify-qs';
import { MongoMemoryServer } from 'mongodb-memory-server';
import request from 'supertest';
import TestAgent from 'supertest/lib/agent';
import Compression from '@fastify/compress';
import Qs from 'fastify-qs';
import FastifyMultipart from '@fastify/multipart';

export type TestAgentType = { agent: TestAgent, app: NestFastifyApplication, mongoServer: MongoMemoryServer };

export async function getTestAgent(...modules: ModuleDefinition[]): Promise<TestAgentType>
{
  let mongoServer: MongoMemoryServer;

  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [
      ConfigModule.forRoot({
        load: [EnvConfig],
        validationSchema: EnvSchema,
        isGlobal: true
      }),
      CqrsModule.forRoot(),
      MongooseModule.forRootAsync({
        useFactory: async() =>
        {
          mongoServer = await MongoMemoryServer.create();
          const mongoUri = mongoServer.getUri();
          return {
            uri: mongoUri
          };
        }
      }),
      ...modules
    ]
  }).compile();

  const app = moduleFixture.createNestApplication<NestFastifyApplication>(new FastifyAdapter());
  app.setGlobalPrefix('api', {
    exclude: [{ path: '/', method: RequestMethod.GET }]
  });

  await app.register(Compression);
  await app.register(Qs);
  await app.register(FastifyMultipart);

  await app.init();
  await app.getHttpAdapter().getInstance().ready();

  return {
    agent: request(app.getHttpServer()),
    app,
    mongoServer
  };
}
