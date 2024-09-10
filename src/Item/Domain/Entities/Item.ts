import BaseDomain from '../../../Shared/Entities/BaseDomain';

import IItemDomain from './IItemDomain';

class Item extends BaseDomain implements IItemDomain
{
    name: string;
    description: number;
}

export default Item;
