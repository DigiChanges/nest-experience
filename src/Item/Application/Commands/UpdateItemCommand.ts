import ItemUpdatePayload from '@src/Item/Domain/Payloads/ItemUpdatePayload';
import Command from '@src/Shared/Commands/Command';

class UpdateItemCommand extends Command<ItemUpdatePayload> {}

export default UpdateItemCommand;
