import SaveItemCommand from '../Commands/SaveItemCommand';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import IItemRepository from '../../Domain/Repositories/IItemRepository';
import Item from '../../Domain/Entities/Item';
import IItemDomain from '../../Domain/Entities/IItemDomain';
import { ItemSchemaSaveValidation } from '../Validations/ItemSchemaSaveValidation';
import ValidatedHandler from '../../../Shared/Handlers/ValidatedHandler';
import ItemRepPayload from '../../Domain/Payloads/ItemRepPayload';

@CommandHandler(SaveItemCommand)
class SaveItemHandler extends ValidatedHandler<SaveItemCommand> implements ICommandHandler<SaveItemCommand>
{
    constructor(private repository: IItemRepository)
    {
        super(ItemSchemaSaveValidation);
    }

    async execute(command: SaveItemCommand): Promise<void>
    {
        const payload = await this.validate<ItemRepPayload>(command);

        const item: IItemDomain = new Item();
        item.description = payload.description;
        item.name = payload.name;

        await this.repository.save(item);
    }
}

export default SaveItemHandler;
