import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import IItemDomain from '../../Domain/Entities/IItemDomain';
import { Transformer } from '../../../Shared/Transformers';
import IItemTransformer from './IItemTransformer';

class ItemTransformer extends Transformer<IItemDomain, IItemTransformer>
{
    public transform(item: IItemDomain): IItemTransformer
    {
        dayjs.extend(utc);

        return {
            id: item.id,
            name: item.name,
            description: item.description,
            ...this.getTimestamp(item)
        };
    }
}

export default ItemTransformer;
