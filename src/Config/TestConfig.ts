import compression from '@fastify/compress';
import { RequestMethod } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ModuleDefinition } from '@nestjs/core/interfaces/module-definition.interface';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { Test, TestingModule } from '@nestjs/testing';
import { EnvConfig, EnvSchema } from '@src/Config/EnvConfig';
import qs from 'fastify-qs';
import request from 'supertest';
import TestAgent from 'supertest/lib/agent';

type TestAgentType = { agent: TestAgent, app: NestFastifyApplication };

export async function getTestAgent(...modules: ModuleDefinition[]): Promise<TestAgentType>
{
  const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          load: [EnvConfig],
          validationSchema: EnvSchema,
          isGlobal: true
        }),
        CqrsModule.forRoot(),
        MongooseModule.forRootAsync({
          imports: [],
          useFactory: async(config: ConfigService) => ({
            uri: config.get('DB_URI', 'mongodb://experience:experience@localhost:27018/experience')
          }),
          inject: [ConfigService]
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
