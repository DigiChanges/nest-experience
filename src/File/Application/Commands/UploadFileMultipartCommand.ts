import MultipartFilePayload from '@file/Domain/Payloads/MultipartFilePayload';
import Command from '@shared/Cqrs/Command';

class UploadFileMultipartCommand extends Command<MultipartFilePayload> {}

export default UploadFileMultipartCommand;
