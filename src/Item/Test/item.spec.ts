import { afterAll, beforeAll, describe, expect } from 'vitest';
import TestAgent from 'supertest/lib/agent';
import { ItemModule } from '@src/Item/ItemModule';
import { getTestAgent, TestAgentType } from '@src/Config/TestConfig';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { SharedModule } from '@shared/SharedModule';
import { MongoMemoryServer } from 'mongodb-memory-server';
import ItemRepPayload from '@src/Item/Domain/Payloads/ItemRepPayload';
import { randomUUID } from 'crypto';

describe('ItemModule (e2e)', () =>
{
  let app: NestFastifyApplication;
  let agent: TestAgent;
  let mongoServer: MongoMemoryServer;
  let config: TestAgentType;
  let itemId: string;

  beforeAll(async() =>
  {
    config = await getTestAgent(SharedModule, ItemModule);
    app = config.app;
    agent = config.agent;
    mongoServer = config.mongoServer;
  });

  afterAll(async() =>
  {
    await app.close();
    await mongoServer.stop();
  });

  describe('Item Success', () =>
  {
    test('Add Item /items', async() =>
    {
      const payloads: ItemRepPayload[] = [
        {
          name: 'Item 1',
          description: 10
        },
        {
          name: 'Item 2',
          description: 11
        }
      ];

      for (const payload of payloads)
      {
        const response = await agent
          .post('/api/items')
          .set('Accept', 'application/json')
          .send(payload);

        expect(response.statusCode).toStrictEqual(201);
        expect(response.body).toEqual({ message: 'Item created.' });
      }
    });

    test('Get Items /items with pagination', async() =>
    {
      const response = await agent.get('/api/items?pagination[offset]=0&pagination[limit]=5');

      const { body: { data, pagination } } = response;

      expect(response.statusCode).toEqual(200);
      expect(data.length).toEqual(2);
      expect(pagination.total).toEqual(2);
      expect(pagination.perPage).toEqual(2);
      expect(pagination.currentPage).toEqual(1);
      expect(pagination.lastPage).toEqual(1);
      expect(pagination.from).toEqual(0);
      expect(pagination.to).toEqual(2);
      expect(pagination.firstUrl).toContain('/api/items?pagination[offset]=0&pagination[limit]=5');
      expect(pagination.lastUrl).toContain('/api/items?pagination[offset]=0&pagination[limit]=5');
      expect(pagination.nextUrl).toBeNull();
      expect(pagination.prevUrl).toBeNull();
      expect(pagination.currentUrl).toContain('/api/items?pagination[offset]=0&pagination[limit]=5');

      itemId = data[0].id;
    });

    test('Get Item /items/:id', async() =>
    {
      const payload = {
        name: 'Item 1',
        description: 10
      };

      const response = await agent
        .get(`/api/items/${itemId}`)
        .send();


      const { body: data } = response;

      expect(response.statusCode).toStrictEqual(200);

      expect(data.name).toStrictEqual(payload.name);
      expect(data.description).toStrictEqual(payload.description);
    });

    test('Get Items /items without pagination', async() =>
    {
      const response = await agent
        .get('/api/items')
        .send();

      const { body: { data, pagination } } = response;

      expect(response.statusCode).toStrictEqual(200);

      expect(data.length).toStrictEqual(2);
      expect(pagination).not.toBeDefined();
    });

    test('Get Items /items with Filter Type', async() =>
    {
      const response = await agent
        .get('/api/items?pagination[limit]=20&pagination[offset]=0&filter[description]=10')
        .send();

      const { body: { data, pagination } } = response;

      expect(response.statusCode).toStrictEqual(200);

      expect(data.length).toStrictEqual(2);
      expect(pagination.total).toStrictEqual(2);

      expect(data[0].description).toStrictEqual(10);
    });

    test('Get Items /items with Sort Desc Type', async() =>
    {
      const response = await agent
        .get('/api/items?pagination[limit]=20&pagination[offset]=0&sort[description]=desc')
        .send();

      // TODO: See why is not ordered desc.

      const { body: { data: [item1, item2] } } = response;

      //
      // expect(response.statusCode).toStrictEqual(200);
      //
      // expect(item1.description).toBeGreaterThanOrEqual(item2.description);
    });
  });

  describe('Item Fails', () =>
  {
    test('Add Item /items', async() =>
    {
      const payload = {
        name: 'Item 2',
        description: 'Item 1'
      };

      const response = await agent
        .post('/api/items')
        .send(payload);

      const { body: { message, error } } = response;

      expect(response.statusCode).toStrictEqual(400);
      expect(error).toStrictEqual('Bad Request');
      expect(message[0].code).toStrictEqual('invalid_type');
      expect(message[0].message).toStrictEqual('Expected number, received string');
    });

    test('Get Item /items/:id', async() =>
    {
      const response = await agent
        .get(`/api/items/${itemId}dasdasda123`)
        .send();

      const { body: { message, error } } = response;

      expect(response.statusCode).toStrictEqual(400);
      expect(error).toStrictEqual('Bad Request');
      expect(message[0].code).toStrictEqual('invalid_string');
      expect(message[0].message).toStrictEqual('Invalid uuid');
    });

    test('Update Item /items/:id', async() =>
    {
      const payload = {
        name: 11,
        type: 'asdasd'
      };

      const response = await agent
        .put(`/api/items/${itemId}`)
        .send(payload);

      const { body: { message, error } } = response;

      expect(response.statusCode).toStrictEqual(400);
      expect(error).toStrictEqual('Bad Request');

      message.forEach((el, index: number) =>
      {
        expect(el.code).toStrictEqual('invalid_type');

        if (index === 0)
        {
          expect(el.message).toStrictEqual('Expected string, received number');
        }

        if (index === 1)
        {
          expect(el.message).toStrictEqual('Required');
        }
      });
    });

    test('Delete Item error /items/:id', async() =>
    {
      const deleteErrorResponse = await agent
        .delete(`/api/items/${randomUUID()}`)
        .send();

      const { body: { message } } = deleteErrorResponse;

      expect(deleteErrorResponse.statusCode).toStrictEqual(404);
      expect(message).toStrictEqual('Not Found');
    });
  });
});
