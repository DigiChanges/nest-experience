import { Module } from '@nestjs/common';
import { AppController } from './Presentation/Controllers/AppController';
import { ItemModule } from '../Item/ItemModule';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../Auth/AuthModule';
import { CommandModule } from '../Command/CommandModule';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://ecommerce:ecommerce@ecommerce.dlicjcg.mongodb.net/nest-boilerplate'),
    AuthModule,
    ItemModule,
    CommandModule
  ],
  controllers: [AppController]
})
export class AppModule {}
