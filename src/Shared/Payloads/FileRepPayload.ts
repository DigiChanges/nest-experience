import { FileVersionPayload } from '@shared/Payloads/FileVersionPayload';

interface FileRepPayload extends FileVersionPayload
{
  originalName: string;
  mimeType: string;
  path: string;
  extension: string;
  size: number;
  isPublic: boolean;
  isImage: boolean;
}

export default FileRepPayload;
