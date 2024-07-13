import { Module } from '@nestjs/common';
import SaveItemUseCase from './Domain/UseCases/SaveItemUseCase';
import ItemController from './Presentation/Controllers/ItemController';
import { MongooseModule } from '@nestjs/mongoose';
import Item from './Domain/Entities/Item';
import ItemSchema from './Infrastructure/Schemas/ItemSchema';

@Module({
  imports: [
      MongooseModule.forFeature([{ name: Item.name, schema: ItemSchema }])
  ],
  controllers: [ItemController],
  providers: [
      SaveItemUseCase
  ]
})
export class ItemModule
{}
