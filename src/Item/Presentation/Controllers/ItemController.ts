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
import ItemFilter from '../Criterias/ItemFilter';
import ItemSort from '../Criterias/ItemSort';
import ListItemQuery from '../../Application/Queries/ListItemQuery';
import { Criteria } from '../../../Shared/Criteria/CriteriaDecorator';
import Responder from '../../../Shared/Utils/Responder';
import IItemTransformer from '../Transformers/IItemTransformer';
import { ICriteria } from '../../../Shared/Criteria/ICriteria';
import { IPaginator } from '../../../Shared/Criteria/IPaginator';

@Controller('items')
class ItemController
{
    constructor(
        private queryBus: QueryBus,
        private commandBus: CommandBus,
        private responder: Responder
    ) {}

    @Post('/')
    async save(@Body() payload: ItemRepPayload)
    {
        await this.commandBus.execute(new SaveItemCommand(payload));

        return { message: 'Item created.' };
    }

    @Get('/')
    async list(@Criteria([ItemFilter, ItemSort]) payload: ICriteria)
    {
        const paginator: IPaginator = await this.queryBus.execute(new ListItemQuery(payload));

        return this.responder.paginate<IItemDomain, IItemTransformer>(paginator, new ItemTransformer());
    }

    @Get('/:id')
    async show(@Param() payload: IdPayload)
    {
        const item$: Promise<IItemDomain> = this.queryBus.execute(new GetItemQuery(payload));

        return this.responder.send<IItemDomain, IItemTransformer>(item$, new ItemTransformer());
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
