import { Module } from '@nestjs/common';
// import ItemController from './Presentation/Controllers/ItemController';
import { MongooseModule } from '@nestjs/mongoose';
import File from './Domain/Entities/File';
import FileVersion from './Domain/Entities/FileVersion';

// import ItemSchema from './Infrastructure/Schemas/ItemSchema';
import { CqrsModule } from '@nestjs/cqrs';
import { QueryHandlers } from './Application/Handlers';
// import ItemMongooseRepository from './Infrastructure/Repositories/ItemMongooseRepository';
import IFileRepository from './Domain/Repositories/IFileRepository';
import IFileVersionRepository from './Domain/Repositories/IFileVersionRepository';
import { SharedModule } from '../Shared/SharedModule';
// TODO Infrastructure
@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      { name: File.name, schema: ItemSchema },
      { name: FileVersion.name, schema: ItemSchema }
    ]),
    SharedModule
  ],
  controllers: [ItemController],
  providers: [
    ...QueryHandlers,
    { provide: IFileRepository, useClass: ItemMongooseRepository },
    { provide: IFileVersionRepository, useClass: ItemMongooseRepository }
  ]
})
export class ItemModule {}
