import { CommandFactory } from 'nest-commander';
import { AppModule } from '@src/App/AppModule';
import { Logger } from '@nestjs/common';

void (async() =>
{
  const logger = new Logger();
  await CommandFactory.run(AppModule, logger);
})();
