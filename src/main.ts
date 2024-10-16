import { AppModule } from '@app/AppModule';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import App from '@src/appFactory';

void (async() =>
{
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );

  const application = new App(app);

  application.init();
  application.useGlobalFilters();
  await application.initMiddleware();
  await application.listen(8089);
})();
