import Command from '@shared/Cqrs/Command';
import FileUpdatePayload from '@src/File/Domain/Payloads/FileUpdatePayload';

class UpdateFileCommand extends Command<FileUpdatePayload> {}

export default UpdateFileCommand;
