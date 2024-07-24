import { Module } from '@nestjs/common';
import { AppController } from './Presentation/Controllers/AppController';
import { ItemModule } from '../Item/ItemModule';
import { MongooseModule } from '@nestjs/mongoose';
import { CqrsModule } from '@nestjs/cqrs';
import { SharedModule } from '@shared/SharedModule';
import { AuthModule } from '@src/Auth/AuthModule';
import { envConfig } from '@src/Config/EnvConfig';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [() => envConfig],
      isGlobal: true,
    }),
    CqrsModule.forRoot(),
    MongooseModule.forRoot(''),
    SharedModule,
    ItemModule,
    AuthModule
  ],
  controllers: [AppController]
})
export class AppModule {}
