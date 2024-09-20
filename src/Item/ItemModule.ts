import { QueryHandlers } from '@item/Application/Handlers';
import Item from '@item/Domain/Entities/Item';
import IItemRepository from '@item/Domain/Repositories/IItemRepository';
import ItemMongooseRepository from '@item/Infrastructure/Repositories/ItemMongooseRepository';
import ItemSchema from '@item/Infrastructure/Schemas/ItemSchema';
import ItemController from '@item/Presentation/Controllers/ItemController';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
      MongooseModule.forFeature([{ name: Item.name, schema: ItemSchema }])
  ],
  controllers: [ItemController],
  providers: [
      ...QueryHandlers,
      { provide: IItemRepository, useClass: ItemMongooseRepository }
  ]
})
export class ItemModule {}
