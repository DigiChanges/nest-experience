import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import ValidatedHandler from '@shared/Validations/ValidatedHandler';

import IItemDomain from '../../Domain/Entities/IItemDomain';
import Item from '../../Domain/Entities/Item';
import ItemRepPayload from '../../Domain/Payloads/ItemRepPayload';
import IItemRepository from '../../Domain/Repositories/IItemRepository';
import SaveItemCommand from '../Commands/SaveItemCommand';
import { ItemSchemaSaveValidation } from '../Validations/ItemSchemaSaveValidation';

@CommandHandler(SaveItemCommand)
class SaveItemHandler extends ValidatedHandler<SaveItemCommand, void> implements ICommandHandler<SaveItemCommand>
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
