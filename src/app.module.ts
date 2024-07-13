import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemModule } from './Item/module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
      MongooseModule.forRoot('mongodb://experience:experience@localhost:27018/experience'),
      ItemModule
  ],
  controllers: [AppController],
  providers: [
      AppService
  ]
})
export class AppModule
{}
