import ItemRepPayload from '../../Domain/Payloads/ItemRepPayload';
import Command from '@src/Shared/Commands/Command';

class SaveItemCommand extends Command<ItemRepPayload> {}

export default SaveItemCommand;
