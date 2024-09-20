
import Command from '@shared/Cqrs/Command';
import IdPayload from '@shared/Payloads/IdPayload';

class RemoveFileCommand extends Command<IdPayload> {}

export default RemoveFileCommand;
