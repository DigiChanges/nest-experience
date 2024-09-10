import IItemDomain from '@item/Domain/Entities/IItemDomain';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IdSchemaValidation } from '@shared/Validations/IdSchemaValidation';
import ValidatedHandler from '@shared/Validations/ValidatedHandler';

import IdPayload from '../../../Shared/Payloads/IdPayload';
import IItemRepository from '../../Domain/Repositories/IItemRepository';
import RemoveItemCommand from '../Commands/RemoveItemCommand';

@CommandHandler(RemoveItemCommand)
class RemoveItemHandler extends ValidatedHandler<RemoveItemCommand, IItemDomain> implements ICommandHandler<RemoveItemCommand>
{
    constructor(private repository: IItemRepository)
    {
        super(IdSchemaValidation);
    }

    async execute(command: RemoveItemCommand): Promise<IItemDomain>
    {
        const { id } = await this.validate<IdPayload>(command);

        return await this.repository.delete(id);
    }
}

export default RemoveItemHandler;
