import { AppController } from '@app/Presentation/Controllers/AppController';
import { AuthModule } from '@auth/AuthModule';
import { EnvConfig, EnvSchema } from '@config/EnvConfig';
import { FileModule } from '@file/FileModule';
import { ItemModule } from '@item/ItemModule';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedModule } from '@shared/SharedModule';

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
      useFactory: (config: ConfigService) => ({
        uri: config.get('DB_URI', 'mongodb://experience:experience@localhost:27018/experience')
      }),
      inject: [ConfigService]
    }),
    AuthModule,
    ItemModule,
    FileModule,
    SharedModule
  ],
  controllers: [AppController]
})

export class AppModule {}
