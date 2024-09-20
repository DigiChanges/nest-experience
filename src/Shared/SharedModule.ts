import { Global, Module } from '@nestjs/common';
import FileService from '@shared/Filesystem/FileService';
import ProviderFilesystem from '@shared/Filesystem/ProviderFilesystem';

@Global()
@Module({
  providers: [
    ProviderFilesystem,
    FileService
  ],
  exports: [ProviderFilesystem, FileService]
})
export class SharedModule {}
