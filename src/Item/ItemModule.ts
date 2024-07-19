import { Module } from '@nestjs/common';
import ItemController from './Presentation/Controllers/ItemController';
import { MongooseModule } from '@nestjs/mongoose';
import Item from './Domain/Entities/Item';
import ItemSchema from './Infrastructure/Schemas/ItemSchema';
import { QueryHandlers } from './Application/Handlers';
import ItemMongooseRepository from './Infrastructure/Repositories/ItemMongooseRepository';
import IItemRepository from './Domain/Repositories/IItemRepository';

@Module({
  imports: [
      MongooseModule.forFeature([{ name: Item.name, schema: ItemSchema }]),
  ],
  controllers: [ItemController],
  providers: [
      ...QueryHandlers,
      { provide: IItemRepository, useClass: ItemMongooseRepository }
  ]
})
export class ItemModule {}
