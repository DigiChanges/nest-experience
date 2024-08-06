import ItemUpdatePayload from '@src/Item/Domain/Payloads/ItemUpdatePayload';
import Command from '@shared/Commands/Command';

class UpdateItemCommand extends Command<ItemUpdatePayload> {}

export default UpdateItemCommand;
