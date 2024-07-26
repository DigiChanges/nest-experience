import {
  Post,
  Get,
  Controller
} from '@nestjs/common';
import SyncPermissionsHandler from '../../Application/Handlers/SyncPermissionsHandler';
import PermissionHandler from '../../Application/Handlers/PermissionHandler';
import PermissionsTransformer from '../Transformers/PermissionsTransformer';
import Permissions from '../../../Config/Permissions';
import AllowedPermission from '../Decorators/PermissionDecorator';
import Transform from '@shared/Transformers/TransformDecorator';

@Controller('auth')
class AuthController
{
  constructor(
      private readonly syncRolesPermissionHandler: SyncPermissionsHandler,
      private readonly permissionHandler: PermissionHandler
  ) {}

  @Post('/')
  @AllowedPermission(Permissions.AUTH_SYNC_PERMISSIONS)
  async syncRolesPermission()
{
    await this.syncRolesPermissionHandler.handle();

    return {
      message: 'Sync Successfully'
    };
  }

  @Get('/')
  @AllowedPermission(Permissions.AUTH_GET_PERMISSIONS)
  @Transform(PermissionsTransformer)
  async getPermissions()
{
    return await this.permissionHandler.handle();
  }
}
export default AuthController;
