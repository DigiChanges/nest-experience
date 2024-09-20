import Command from '@shared/Cqrs/Command';
import ItemUpdatePayload from '@src/Item/Domain/Payloads/ItemUpdatePayload';

class UpdateItemCommand extends Command<ItemUpdatePayload> {}

export default UpdateItemCommand;
