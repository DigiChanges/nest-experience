import {
  Post,
  Get,
  Controller, UseInterceptors
} from '@nestjs/common';
import SyncPermissionsHandler from '../../Application/Handlers/SyncPermissionsHandler';
import PermissionHandler from '../../Application/Handlers/PermissionHandler';
import IGroupPermission from '../../../Config/IGroupPermissions';
import Responder from '../../../Shared/Utils/Responder';
import PermissionsTransformer from '../Transformers/PermissionsTransformer';
import IPermissionTransformer from '../Transformers/IPermissionsTransformer';
import Permissions from '../../../Config/Permissions';
import { PermissionsInterceptor } from '../Interceptors/PermissionInterceptor';
import AuthorizeSupabaseService from '../../Domain/Services/AuthorizeSupabaseService';

@Controller('auth')
class AuthController
{
  constructor(
      private readonly syncRolesPermissionHandler: SyncPermissionsHandler,
      private readonly permissionHandler: PermissionHandler,
      private readonly responder: Responder
  ) {}

  @Post('/')
  async syncRolesPermission()
  {
    await this.syncRolesPermissionHandler.handle();

    return {
      message: 'Sync Successfully'
    };
  }

  @Get('/')
  @UseInterceptors(new PermissionsInterceptor(Permissions.AUTH_GET_PERMISSIONS))
  async getPermissions()
  {
    const payload: Promise<IGroupPermission[]> = this.permissionHandler.handle();
    return this.responder.send<IGroupPermission[], IPermissionTransformer[]>(payload, new PermissionsTransformer());
  }
}
export default AuthController;
