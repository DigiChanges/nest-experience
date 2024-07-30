import { Command, CommandRunner } from 'nest-commander';
import { CommandBus } from '@nestjs/cqrs';
import SyncPermissionsCommand from '../../Application/Commands/SyncPermissionsCommand';

@Command({ name: 'syncRolesPermission', description: 'Sync permissions' })
export class SyncRolesPermissionCommander extends CommandRunner
{
  constructor(private commandBus: CommandBus)
{
    super();
  }
  async run(): Promise<void>
  {
    await this.commandBus.execute(new SyncPermissionsCommand());
  }
}
