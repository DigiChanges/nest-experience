import { CreateBucketCommander } from '@file/Presentation/Commands/CreateBucketCommander';
import CreateBucketCommandRequest from '@file/Presentation/Requests/CreateBucketCommandRepRequest';
import ICreateBucketCommandRequest from '@file/Presentation/Requests/ICreateBucketCommandRequest';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
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
    CreateBucketCommander,
    ...QueryHandlers,
    { provide: IFileRepository, useClass: FileMongooseRepository },
    {
      provide: ICreateBucketCommandRequest,
      useFactory: async(configService: ConfigService) =>
      {
        const config = {
          fileSystemBucket: configService.get<string>('FILESYSTEM_BUCKET'),
          fileSystemRegion: configService.get<string>('FILESYSTEM_REGION')
        };

        return new CreateBucketCommandRequest(config);
      },
      inject: [ConfigService]
    }
  ]
})
export class FileModule
{}
