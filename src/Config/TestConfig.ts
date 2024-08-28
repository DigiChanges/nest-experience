import { Test, TestingModule } from '@nestjs/testing';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import request from 'supertest';
import TestAgent from 'supertest/lib/agent';
import { ConfigModule } from '@nestjs/config';
import { EnvConfig, EnvSchema } from '@src/Config/EnvConfig';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedModule } from '@shared/SharedModule';
import { RequestMethod } from '@nestjs/common';
import compression from '@fastify/compress';
import qs from 'fastify-qs';
import { ModuleDefinition } from '@nestjs/core/interfaces/module-definition.interface';
import { MongoMemoryServer } from 'mongodb-memory-server';

type TestAgentType = { agent: TestAgent, app: NestFastifyApplication };

export async function getTestAgent(...modules: ModuleDefinition[]): Promise<TestAgentType>
{
  const mongoServer = await MongoMemoryServer.create();

  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [
      ConfigModule.forRoot({
        load: [EnvConfig],
        validationSchema: EnvSchema,
        isGlobal: true
      }),
      CqrsModule.forRoot(),
      MongooseModule.forRootAsync({
        useFactory: async() => ({
          uri: mongoServer.getUri()
        })
      }),
      ...modules
    ]
  }).compile();

  const app = moduleFixture.createNestApplication<NestFastifyApplication>(new FastifyAdapter());
  app.setGlobalPrefix('api', {
    exclude: [{ path: '/', method: RequestMethod.GET }]
  });

  await app.register(compression);
  await app.register(qs);

  await app.init();
  await app.getHttpAdapter().getInstance().ready();

  return {
    agent: request(app.getHttpServer()),
    app
  };
}
