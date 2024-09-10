import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import ValidatedHandler from '@shared/Validations/ValidatedHandler';

import IItemDomain from '../../Domain/Entities/IItemDomain';
import ItemUpdatePayload from '../../Domain/Payloads/ItemUpdatePayload';
import IItemRepository from '../../Domain/Repositories/IItemRepository';
import UpdateItemCommand from '../Commands/UpdateItemCommand';
import ItemSchemaUpdateValidation from '../Validations/ItemSchemaUpdateValidation';

@CommandHandler(UpdateItemCommand)
class UpdateItemHandler extends ValidatedHandler<UpdateItemCommand, void> implements ICommandHandler<UpdateItemCommand>
{
    constructor(private repository: IItemRepository)
    {
        super(ItemSchemaUpdateValidation);
    }

    async execute(command: UpdateItemCommand): Promise<void>
    {
        const payload = await this.validate<ItemUpdatePayload>(command);

        const item: IItemDomain = await this.repository.getOne(payload.id);
        item.description = payload.description;
        item.name = payload.name;

        await this.repository.save(item);
    }
}

export default UpdateItemHandler;
