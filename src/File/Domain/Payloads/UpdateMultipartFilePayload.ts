import MultipartFilePayload from '@file/Domain/Payloads/MultipartFilePayload';
import IdPayload from '@shared/Payloads/IdPayload';

interface UpdateMultipartFilePayload extends MultipartFilePayload, IdPayload {}

export default UpdateMultipartFilePayload;
