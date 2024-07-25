import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EnvSchema, EnvConfig } from '@src/Config/EnvConfig';
import { AppConfigService } from '@src/Config/AppConfigService';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfig],
      validationSchema: EnvSchema,
      isGlobal: true
    })
  ],
  providers: [
    ConfigService, AppConfigService
  ],
  exports: [ConfigService, AppConfigService]
})

export class AppConfigModule {}
