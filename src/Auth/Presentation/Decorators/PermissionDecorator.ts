import { applyDecorators, SetMetadata, UseInterceptors } from '@nestjs/common';
import { PermissionsInterceptor } from '../Interceptors/PermissionInterceptor';
export const PERMISSIONS = 'PERMISIONS';
const AllowedPermissions = (permission: string) =>
{
  return applyDecorators(
    SetMetadata(PERMISSIONS, permission),
    UseInterceptors(PermissionsInterceptor)
  );
};

export default AllowedPermissions;
