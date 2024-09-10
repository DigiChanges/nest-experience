import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { SharedModule } from '@shared/SharedModule';
import { getTestAgent } from '@src/Config/TestConfig';
import { FileModule } from '@src/File/FileModule';
import TestAgent from 'supertest/lib/agent';
import { afterAll, expect } from 'vitest';

describe('FileModule (e2e)', () =>
{
  let app: NestFastifyApplication;
  let agent: TestAgent;

  beforeEach(async() =>
  {
    const config = await getTestAgent(SharedModule, FileModule);
    app = config.app;
    agent = config.agent;
  });

  afterAll(async() =>
  {
    await app.close();
  });

  test('/ (GET)', async() =>
  {
    const response = await agent.get('/api/files');

    expect(response.statusCode).toEqual(200);
  });
});
