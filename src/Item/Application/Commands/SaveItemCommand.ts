import ItemRepPayload from '../../Domain/Payloads/ItemRepPayload';
import Command from '@shared/Commands/Command';

class SaveItemCommand extends Command<ItemRepPayload> {}

export default SaveItemCommand;
