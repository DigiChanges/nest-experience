import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { QueryHandlers } from './Application/Handlers';
import File from './Domain/Entities/File';
import IFileRepository from './Domain/Repositories/IFileRepository';
import FileMongooseRepository from './Infrastructure/Repositories/FileMongooseRepository';
import FileSchema from './Infrastructure/Schemas/FileSchema';
import FileController from './Presentation/Controllers/FileController';

@Module({
  imports: [
      MongooseModule.forFeature([{ name: File.name, schema: FileSchema }])
  ],
  controllers: [FileController],
  providers: [
      ...QueryHandlers,
      { provide: IFileRepository, useClass: FileMongooseRepository }
  ]
})
export class FileModule {}
