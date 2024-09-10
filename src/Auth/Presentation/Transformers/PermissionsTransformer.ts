import { Transformer } from '@shared/Transformers';

import IGroupPermissions from '../../../Config/IGroupPermissions';

import IPermissionsTransformer from './IPermissionsTransformer';

class PermissionsTransformer extends Transformer<IGroupPermissions[], IPermissionsTransformer[]>
{
  public transform(data: IGroupPermissions[]): IPermissionsTransformer[]
  {
    return data;
  }
}

export default PermissionsTransformer;
