
import Command from '@shared/Cqrs/Command';
import IdPayload from '@shared/Payloads/IdPayload';

class RemoveItemCommand extends Command<IdPayload> {}

export default RemoveItemCommand;
