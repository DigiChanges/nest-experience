import {
    Post,
    Get,
    Controller,
    Body,
    Param,
    Delete,
    Put
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import ItemRepPayload from '../../Domain/Payloads/ItemRepPayload';
import SaveItemCommand from '../../Application/Commands/SaveItemCommand';
import IdPayload from '../../../Shared/Payloads/IdPayload';
import GetItemQuery from '../../Application/Queries/GetItemQuery';
import ItemTransformer from '../Transformers/ItemTransformer';
import IItemDomain from '../../Domain/Entities/IItemDomain';
import ItemUpdatePayload from '../../Domain/Payloads/ItemUpdatePayload';
import UpdateItemCommand from '../../Application/Commands/UpdateItemCommand';
import RemoveItemCommand from '../../Application/Commands/RemoveItemCommand';
import ListItemQuery from '../../Application/Queries/ListItemQuery';
import { Criteria } from '@shared/Criteria/CriteriaDecorator';
import { ICriteria } from '@shared/Criteria/ICriteria';
import Transform from '@shared/Transformers/TransformDecorator';
import Paginate from '@shared/Criteria/PaginateDecorator';
import ItemFilter from '@src/Item/Presentation/Criterias/ItemFilter';
import ItemSort from '@src/Item/Presentation/Criterias/ItemSort';
import Criterias from '@shared/Criteria/CriteriasDecorator';
import { IPaginator } from '@shared/Criteria/IPaginator';

@Controller('items')
class ItemController
{
    constructor(
        private queryBus: QueryBus,
        private commandBus: CommandBus
    ) {}

    @Post('/')
    async save(@Body() payload: ItemRepPayload)
    {
        await this.commandBus.execute(new SaveItemCommand(payload));

        return { message: 'Item created.' };
    }

    @Get('/')
    @Paginate()
    @Transform(ItemTransformer)
    @Criterias(ItemFilter, ItemSort)
    async list(@Criteria() payload: ICriteria): Promise<IPaginator>
    {
        return this.queryBus.execute(new ListItemQuery(payload));
    }

    @Get('/:id')
    @Transform(ItemTransformer)
    async show(@Param() payload: IdPayload): Promise<IItemDomain>
    {
       return this.queryBus.execute(new GetItemQuery(payload));
    }

    @Put('/:id')
    async update(@Param() idPayload: IdPayload, @Body() bodyPayload: ItemRepPayload)
    {
        const payload: ItemUpdatePayload = {
            ...idPayload,
            ...bodyPayload
        };

        await this.commandBus.execute(new UpdateItemCommand((payload)));

        return { message: 'Item updated.', id: payload.id };
    }

    @Delete('/:id')
    async remove(@Param() payload: IdPayload)
    {
        await this.commandBus.execute(new RemoveItemCommand((payload)));

        return { message: 'Item removed.', id: payload.id };
    }
}

export default ItemController;
