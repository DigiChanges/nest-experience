import {
  Post,
  Get,
  Controller
} from '@nestjs/common';
import PermissionsTransformer from '../Transformers/PermissionsTransformer';
import Permissions from '../../../Config/Permissions';
import AllowedPermission from '../Decorators/PermissionDecorator';
import Transform from '@shared/Transformers/TransformDecorator';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import GetPermissionsQuery from '@src/Auth/Application/Queries/GetPermissionsQuery';
import SyncPermissionsCommand from '@src/Auth/Application/Commands/SyncPermissionsCommand';

@Controller('auth')
class AuthController
{
  constructor(
      private queryBus: QueryBus,
      private commandBus: CommandBus
  ) {}

  @Post('/')
  @AllowedPermission(Permissions.AUTH_SYNC_PERMISSIONS)
  async syncRolesPermission()
{
    await this.commandBus.execute(new SyncPermissionsCommand());

    return {
      message: 'Sync Successfully'
    };
  }

  @Get('/')
  @AllowedPermission(Permissions.AUTH_GET_PERMISSIONS)
  @Transform(PermissionsTransformer)
  async getPermissions()
  {
    return this.queryBus.execute(new GetPermissionsQuery());
  }
}
export default AuthController;
