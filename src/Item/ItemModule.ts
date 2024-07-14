import { Module } from '@nestjs/common';
import ItemController from './Presentation/Controllers/ItemController';
import { MongooseModule } from '@nestjs/mongoose';
import Item from './Domain/Entities/Item';
import ItemSchema from './Infrastructure/Schemas/ItemSchema';
import { CqrsModule } from '@nestjs/cqrs';
import { QueryHandlers } from './Application/Handlers';
import ItemMongooseRepository from './Infrastructure/Repositories/ItemMongooseRepository';
import IItemRepository from './Domain/Repositories/IItemRepository';
import { SharedModule } from '../Shared/SharedModule';

@Module({
  imports: [
      CqrsModule,
      MongooseModule.forFeature([{ name: Item.name, schema: ItemSchema }]),
      SharedModule
  ],
  controllers: [ItemController],
  providers: [
      ...QueryHandlers,
      { provide: IItemRepository, useClass: ItemMongooseRepository }
  ]
})
export class ItemModule {}
