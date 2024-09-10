import { Global, Module } from '@nestjs/common';
import FileService from '@shared/Filesystem/FileService';
import ProviderFilesystem from '@shared/Filesystem/ProviderFilesystem';
import { SyncRolesPermissionCommander } from '@src/Auth/Presentation/Commands/SyncRolesPermissionCommander';

@Global()
@Module({
  providers: [
    SyncRolesPermissionCommander, // TODO: Remove this
    ProviderFilesystem,
    FileService
  ],
  exports: [ProviderFilesystem, FileService]
})
export class SharedModule {}
