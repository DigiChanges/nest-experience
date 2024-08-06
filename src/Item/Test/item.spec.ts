
import { AppModule } from '@src/App/AppModule';
import { it } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import request from 'supertest';

describe('AppController (e2e)', () =>
{
  let app: NestFastifyApplication;
  beforeEach(async() =>
  {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleFixture.createNestApplication<NestFastifyApplication>(new FastifyAdapter());
    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });

  it('/ (GET)', () =>
  {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect({
        message: "Welcome to Nest Experience"
      });
  });
});
