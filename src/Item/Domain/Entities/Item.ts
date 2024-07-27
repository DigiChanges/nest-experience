import IItemDomain from './IItemDomain';
import BaseDomain from '../../../Shared/Entities/BaseDomain';

class Item extends BaseDomain implements IItemDomain
{
    name: string;
    description: number;
}

export default Item;
