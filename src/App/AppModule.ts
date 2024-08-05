import { Module } from '@nestjs/common';
import { AppController } from './Presentation/Controllers/AppController';
import { ItemModule } from '../Item/ItemModule';
import { MongooseModule } from '@nestjs/mongoose';
import { CqrsModule } from '@nestjs/cqrs';
import { SharedModule } from '@shared/SharedModule';
import { AuthModule } from '@src/Auth/AuthModule';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EnvConfig, EnvSchema } from '@src/Config/EnvConfig';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfig],
      validationSchema: EnvSchema,
      isGlobal: true
    }),
    CqrsModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [],
      useFactory: async(config: ConfigService) => ({
        uri: config.get('DB_URI', 'mongodb://experience:experience@localhost:27018/experience')
      }),
      inject: [ConfigService]
    }),
    SharedModule,
    ItemModule,
    AuthModule
  ],
  controllers: [AppController]
})
export class AppModule {}
