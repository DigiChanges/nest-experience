import { Module } from '@nestjs/common';
import { AppController } from './Presentation/Controllers/AppController';
import { ItemModule } from '../Item/ItemModule';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    //MongooseModule.forRoot('mongodb://experience:experience@localhost:27018/experience'),
    //TODO remove before commit
    MongooseModule.forRoot(
      'mongodb+srv://Rutito2010:Kaori-chan2010@cluster0.cvyj8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
    ),

    ItemModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
