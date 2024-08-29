import { afterAll, expect } from 'vitest';
import TestAgent from 'supertest/lib/agent';
import { ItemModule } from '@src/Item/ItemModule';
import { getTestAgent } from '@src/Config/TestConfig';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { SharedModule } from '@shared/SharedModule';
import { MongoMemoryServer } from 'mongodb-memory-server';

describe('ItemModule (e2e)', () =>
{
  let app: NestFastifyApplication;
  let agent: TestAgent;
  let mongoServer: MongoMemoryServer;

  beforeEach(async() =>
  {
    const config = await getTestAgent(SharedModule, ItemModule);
    app = config.app;
    agent = config.agent;
    mongoServer = config.mongoServer;
  });

  afterAll(async() =>
  {
    await app.close();
    await mongoServer.stop();
  });

  test('Add Item /items', async() =>
  {
    const payload = {
      name: 'Item 1',
      description: 10
    };

    const response = await agent
      .post('/api/items')
      .set('Accept', 'application/json')
      .send(payload);

    expect(response.statusCode).toStrictEqual(201);
    expect(response.body).toEqual({ message: 'Item created.' });
  });

  test('Get Items /items with pagination', async() =>
  {
    const response = await agent.get('/api/items?pagination[offset]=0&pagination[limit]=5');
    const { body: { data, pagination } } = response;
    expect(response.statusCode).toEqual(200);
    expect(data.length).toEqual(0);
    expect(pagination.total).toEqual(0);
    expect(pagination.perPage).toEqual(0);
    expect(pagination.currentPage).toEqual(1);
    expect(pagination.lastPage).toEqual(0);
    expect(pagination.from).toEqual(0);
    expect(pagination.to).toEqual(0);
    expect(pagination.firstUrl).toContain('/api/items?pagination[offset]=0&pagination[limit]=5');
    expect(pagination.lastUrl).toContain('/api/items?pagination[offset]=-5&pagination[limit]=5');
    expect(pagination.nextUrl).toBeNull();
    expect(pagination.prevUrl).toBeNull();
    expect(pagination.currentUrl).toContain('/api/items?pagination[offset]=0&pagination[limit]=5');
  });
});
