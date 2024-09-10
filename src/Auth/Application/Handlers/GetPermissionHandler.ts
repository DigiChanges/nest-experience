import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import GetPermissionQuery from '@src/Auth/Application/Queries/GetPermissionsQuery';
import GetPermissionsQuery from '@src/Auth/Application/Queries/GetPermissionsQuery';

import IGroupPermission from '../../../Config/IGroupPermissions';
import Permissions from '../../../Config/Permissions';

@QueryHandler(GetPermissionsQuery)
class GetPermissionHandler implements IQueryHandler<GetPermissionQuery>
{
  async execute(): Promise<IGroupPermission[]>
  {
    return Permissions.groupPermissions();
  }
}
export default GetPermissionHandler;
