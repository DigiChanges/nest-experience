import { Transformer } from '@shared/Transformers';
import IPermissionsTransformer from './IPermissionsTransformer';
import IGroupPermissions from '../../../Config/IGroupPermissions';

class PermissionsTransformer extends Transformer<IGroupPermissions[], IPermissionsTransformer[]>
{
  public transform(data: IGroupPermissions[]): IPermissionsTransformer[]
  {
    return data;
  }
}

export default PermissionsTransformer;
