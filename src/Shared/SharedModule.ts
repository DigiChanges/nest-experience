import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import FileService from '@shared/Filesystem/FileService';
import { IFileService } from '@shared/Filesystem/IFileService';
import ProviderFilesystem from '@shared/Filesystem/ProviderFilesystem';

@Global()
@Module({
  providers: [
    ProviderFilesystem,
    {
      provide: IFileService,
      useFactory: async(configService: ConfigService) =>
      {
        const config = {
          fileSystemBucket: configService.get<string>('FILESYSTEM_BUCKET'),
          fileSystemHost: configService.get<string>('FILESYSTEM_HOST'),
          fileSystemPort: configService.get<string>('FILESYSTEM_PORT'),
          fileSystemRootPath: configService.get<string>('FILESYSTEM_ROOT_PATH'),
          fileSystemProtocol: configService.get<string>('FILESYSTEM_PROTOCOL')
        };

        return new FileService(config);
      },
      inject: [ConfigService]
    }
  ],
  exports: [ProviderFilesystem, IFileService]
})
export class SharedModule {}
