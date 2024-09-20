import Command from '@shared/Cqrs/Command';

import ItemRepPayload from '../../Domain/Payloads/ItemRepPayload';

class SaveItemCommand extends Command<ItemRepPayload> {}

export default SaveItemCommand;
