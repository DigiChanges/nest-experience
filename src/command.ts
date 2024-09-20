import { AppModule } from '@app/AppModule';
import { Logger } from '@nestjs/common';
import { CommandFactory } from 'nest-commander';

void (async() =>
{
  const logger = new Logger();
  await CommandFactory.run(AppModule, logger);
})();
