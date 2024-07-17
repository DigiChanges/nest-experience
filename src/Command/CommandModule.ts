import { Module } from '@nestjs/common';
import SyncRolesPermissionCommand from '../Auth/Presentation/Commands/SyncRolesPermissionCommand';

@Module({
  providers: [SyncRolesPermissionCommand]
})

export class CommandModule {}
