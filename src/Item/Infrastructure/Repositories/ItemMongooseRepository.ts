import * as mongoose from 'mongoose';

import IItemRepository from '../../Domain/Repositories/IItemRepository';

import IItemDomain from '../../Domain/Entities/IItemDomain';
import { ItemMongooseDocument } from '../Schemas/ItemSchema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import ItemFilter from '../../Presentation/Criterias/ItemFilter';
import { ICriteria } from '@src/Shared/Criteria/ICriteria';
import BaseMongooseRepository from '../../../Shared/Repositories/BaseMongooseRepository';
import { IPaginator } from '@src/Shared/Criteria/IPaginator';
import MongoosePaginator from '../../../Shared/Utils/MongoosePaginator';

@Injectable()
class ItemMongooseRepository extends BaseMongooseRepository<IItemDomain> implements IItemRepository
{
    constructor(@InjectModel('Item') itemModel: Model<ItemMongooseDocument>)
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
