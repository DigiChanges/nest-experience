import { Module } from '@nestjs/common';
import { AppController } from './Presentation/Controllers/AppController';
import { ItemModule } from '../Item/ItemModule';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
     MongooseModule.forRoot('mongodb://experience:experience@localhost:27018/experience'),
    ItemModule
  ],
  controllers: [AppController]
})
export class AppModule {}
