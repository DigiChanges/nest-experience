import { Transformer } from '@shared/Transformers';

import IFileDomain from '../../Domain/Entities/IFileDomain';

import IFileTransformer from './IFileTransformer';

class FileTransformer extends Transformer<IFileDomain, IFileTransformer>
{
    public transform(file: IFileDomain): IFileTransformer
    {
        return {
            id: file.id,
            originalFileId: file.originalFileId,
            versionUUID: file.versionUUID,
            name: file.name,
            originalName: file.originalName,
            mimeType: file.mimeType,
            path: file.path,
            extension: file.extension,
            size: file.size,
            version: file.version,
            encoding: file.encoding,
            isPublic: file.isPublic,
            ...this.getTimestamp(file)
        };
    }
}

export default FileTransformer;
