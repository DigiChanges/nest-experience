import { Module } from '@nestjs/common';
import { AppController } from './Presentation/Controllers/AppController';
import { ItemModule } from '../Item/ItemModule';
import { MongooseModule } from '@nestjs/mongoose';
import { CqrsModule } from '@nestjs/cqrs';
import { SharedModule } from '@shared/SharedModule';

@Module({
  imports: [
      CqrsModule.forRoot(),
      MongooseModule.forRoot('mongodb://multimoney:multimoney@localhost:27018/multimoney'),
      SharedModule,
      ItemModule
  ],
  controllers: [AppController]
})
export class AppModule {}
