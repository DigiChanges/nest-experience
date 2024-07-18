import FileMultipartRepPayload from './FileMultipartRepPayload';
import IdPayload from '../../../Shared/Payloads/IdPayload';

interface FileUpdateMultipartPayload
  extends IdPayload,
    FileMultipartRepPayload {}

export default FileUpdateMultipartPayload;
