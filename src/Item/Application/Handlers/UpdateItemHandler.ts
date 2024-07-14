import UpdateItemCommand from '../Commands/UpdateItemCommand';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import IItemRepository from '../../Domain/Repositories/IItemRepository';
import ValidatedHandler from '../../../Shared/Handlers/ValidatedHandler';
import ItemSchemaUpdateValidation from '../Validations/ItemSchemaUpdateValidation';
import ItemUpdatePayload from '../../Domain/Payloads/ItemUpdatePayload';
import IItemDomain from '../../Domain/Entities/IItemDomain';

@CommandHandler(UpdateItemCommand)
class UpdateItemHandler extends ValidatedHandler<UpdateItemCommand> implements ICommandHandler<UpdateItemCommand>
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
