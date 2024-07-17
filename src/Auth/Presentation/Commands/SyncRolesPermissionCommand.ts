import { Command, CommandRunner } from 'nest-commander';
import SyncPermissionsHandler from '../../Application/Handlers/SyncPermissionsHandler';
import { Logger } from '@nestjs/common';

@Command({ name: 'syncRolesPermission', description: '' })
class SyncRolesPermissionCommand extends CommandRunner
{
  async run()
  {
    // const handler = new SyncPermissionsHandler();
    // await handler.handle();
    Logger.log('Sync successfully');
  }
}

export default SyncRolesPermissionCommand;
