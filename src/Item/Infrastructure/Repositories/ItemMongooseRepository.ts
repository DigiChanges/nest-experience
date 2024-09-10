import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ICriteria } from '@shared/Criteria/ICriteria';
import { IPaginator } from '@shared/Criteria/IPaginator';
import * as mongoose from 'mongoose';

import BaseMongooseRepository from '../../../Shared/Repositories/BaseMongooseRepository';
import MongoosePaginator from '../../../Shared/Utils/MongoosePaginator';
import IItemDomain from '../../Domain/Entities/IItemDomain';
import IItemRepository from '../../Domain/Repositories/IItemRepository';
import ItemFilter from '../../Presentation/Criterias/ItemFilter';
import { ItemMongooseDocument } from '../Schemas/ItemSchema';

@Injectable()
class ItemMongooseRepository extends BaseMongooseRepository<IItemDomain> implements IItemRepository
{
    constructor(@InjectModel('Item') itemModel: mongoose.Model<ItemMongooseDocument>)
    {
        super(itemModel);
    }

    list(criteria: ICriteria): IPaginator
    {
        const queryBuilder: mongoose.Query<ItemMongooseDocument[], ItemMongooseDocument> = this.repository.find();
        const filter = criteria.getFilter();

        if (filter.has(ItemFilter.TYPE))
        {
            const type = filter.get(ItemFilter.TYPE);
            void queryBuilder.where(ItemFilter.TYPE).equals(type);
        }

        if (filter.has(ItemFilter.NAME))
        {
            const name: string = filter.get(ItemFilter.NAME) as string;
            const rSearch = new RegExp(name, 'g');

            void queryBuilder.where(ItemFilter.NAME).regex(rSearch);
        }

        return new MongoosePaginator(queryBuilder, criteria);
    }
}

export default ItemMongooseRepository;
