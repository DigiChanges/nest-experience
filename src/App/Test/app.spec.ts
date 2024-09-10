import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { SharedModule } from '@shared/SharedModule';
import { AppModule } from '@src/App/AppModule';
import { getTestAgent } from '@src/Config/TestConfig';
import TestAgent from 'supertest/lib/agent';
import { expect } from 'vitest';

describe('AppController (e2e)', () =>
{
  let app: NestFastifyApplication;
  let agent: TestAgent;

  beforeEach(async() =>
  {
    const config = await getTestAgent(SharedModule, AppModule);
    app = config.app;
    agent = config.agent;
  });

  afterAll(async() =>
  {
    await app.close();
  });

  test('/ (GET)', async() =>
  {
    const response = await agent.get('/');

    expect(response.statusCode).toEqual(200);
    expect(response.body.message).toEqual('Welcome to Nest Experience');
  });
});
