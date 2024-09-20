import Compression from '@fastify/compress';
import FastifyMultipart from '@fastify/multipart';
import { RequestMethod } from '@nestjs/common';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import Qs from 'fastify-qs';

class App
{
  constructor(private app:  NestFastifyApplication) {}

  init()
  {
    this.app.setGlobalPrefix('api', {
      exclude: [{ path: '/', method: RequestMethod.GET }]
    });
  }

  async initMiddleware(): Promise<void>
  {
    await this.app.register(Compression);
    await this.app.register(Qs);
    await this.app.register(FastifyMultipart);
  }

  async listen(port: number): Promise<void>
  {
     await this.app.listen(port);
  }
}

export default App;
