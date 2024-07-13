// import ItemRepPayload from '../Payloads/ItemRepPayload';
// import IItemDomain from '../Entities/IItemDomain';
// import IItemRepository from '../Repositories/IItemRepository';
// import ValidatorSchema from '../../../Main/Domain/Shared/ValidatorSchema';
// import ItemSchemaSaveValidation from '../Validations/ItemSchemaSaveValidation';
// import Item from '../Entities/Item';

import ItemRepPayload from '../Payloads/ItemRepPayload';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import Item from '../Entities/Item';
import { Model } from 'mongoose';

@Injectable()
class SaveItemUseCase
{
    // constructor(private repository: IItemRepository)
    constructor(@InjectModel(Item.name) private itemModel: Model<Item>)
    {
        // this.repository = repository;
        this.itemModel = itemModel;
    }

    // async handle(payload: ItemRepPayload): Promise<string>
    async handle(payload: ItemRepPayload): Promise<string>
    {
        console.log('payload');
        console.log(payload);

        const ads = await this.itemModel.create(payload);

        console.log('ads');
        console.log(ads);
        // await ValidatorSchema.handle(ItemSchemaSaveValidation, payload);

        // const item: IItemDomain = new Item();
        // item.type = payload.type;
        // item.name = payload.name;
        //
        // await this.repository.save(item);
        //
        // return item.getId();

        return 'Hi';
    }
}

export default SaveItemUseCase;
