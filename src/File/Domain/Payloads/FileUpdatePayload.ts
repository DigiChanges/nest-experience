import FileRepPayload from '@shared/Payloads/FileRepPayload';
import IdPayload from '@shared/Payloads/IdPayload';

interface FileUpdatePayload extends IdPayload, FileRepPayload
{
  originalFileId: string;
  versionUUID: string;
}

export default FileUpdatePayload;
