import RemoveItemCommand from '../Commands/RemoveItemCommand';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import ValidatedHandler from '../../../Shared/Handlers/ValidatedHandler';
import { IdSchemaValidation } from '@src/Shared/Validations/IdSchemaValidation';
import IItemRepository from '../../Domain/Repositories/IItemRepository';
import IdPayload from '../../../Shared/Payloads/IdPayload';

@CommandHandler(RemoveItemCommand)
class RemoveItemHandler extends ValidatedHandler<RemoveItemCommand> implements ICommandHandler<RemoveItemCommand>
{
    constructor(private repository: IItemRepository)
    {
        super(IdSchemaValidation);
    }

    async execute(command: RemoveItemCommand): Promise<any>
    {
        const { id } = await this.validate<IdPayload>(command);

        return await this.repository.delete(id);
    }
}

export default RemoveItemHandler;
