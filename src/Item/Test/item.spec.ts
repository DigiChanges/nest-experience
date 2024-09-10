import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { SharedModule } from '@shared/SharedModule';
import { getTestAgent } from '@src/Config/TestConfig';
import { ItemModule } from '@src/Item/ItemModule';
import TestAgent from 'supertest/lib/agent';
import { afterAll, expect } from 'vitest';

describe('ItemModule (e2e)', () =>
{
  let app: NestFastifyApplication;
  let agent: TestAgent;

  beforeEach(async() =>
  {
    const config = await getTestAgent(SharedModule, ItemModule);
    app = config.app;
    agent = config.agent;
  });

  afterAll(async() =>
  {
    await app.close();
  });

  test('/ (GET)', async() =>
  {
    const response = await agent.get('/api/items');

    expect(response.statusCode).toEqual(200);
  });
});
