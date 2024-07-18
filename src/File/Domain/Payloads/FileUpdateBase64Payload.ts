import FileBase64RepPayload from './FileBase64RepPayload';
import IdPayload from '../../../Shared/Payloads/IdPayload';

interface FileUpdateBase64Payload extends IdPayload, FileBase64RepPayload {}

export default FileUpdateBase64Payload;
