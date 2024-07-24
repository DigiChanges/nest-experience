import IGroupPermission from '../../../Config/IGroupPermissions';
import Permissions from '../../../Config/Permissions';
class PermissionHandler
{
  async handle(): Promise<IGroupPermission[]>
  {
    return Permissions.groupPermissions();
  }
}

export default PermissionHandler;
