import IItemDomain from '../../Domain/Entities/IItemDomain';
import { Transformer } from '@src/Shared/Transformers';
import IItemTransformer from './IItemTransformer';

class ItemTransformer extends Transformer<IItemDomain, IItemTransformer>
{
    public transform(item: IItemDomain): IItemTransformer
    {
        return {
            id: item.id,
            name: item.name,
            description: item.description,
            ...this.getTimestamp(item)
        };
    }
}

export default ItemTransformer;
