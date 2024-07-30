import { CommandFactory } from 'nest-commander';
import { AppModule } from '@src/App/AppModule';

void (async() =>
{
  await CommandFactory.run(AppModule);
})();
