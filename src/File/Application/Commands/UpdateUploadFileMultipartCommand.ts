import UpdateMultipartFilePayload from '@file/Domain/Payloads/UpdateMultipartFilePayload';
import Command from '@shared/Cqrs/Command';

class UpdateUploadFileMultipartCommand extends Command<UpdateMultipartFilePayload> {}

export default UpdateUploadFileMultipartCommand;
