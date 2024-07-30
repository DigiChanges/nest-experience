import { Global, Module } from '@nestjs/common';
import { SyncRolesPermissionCommander } from '@src/Auth/Presentation/Commands/SyncRolesPermissionCommander';

@Global()
@Module({
  providers: [
    SyncRolesPermissionCommander
  ],
  exports: []
})
export class SharedModule {}
