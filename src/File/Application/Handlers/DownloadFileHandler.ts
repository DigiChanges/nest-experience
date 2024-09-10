import { Readable } from 'node:stream';

import DownloadFileQuery from '@file/Application/Queries/DownloadFileQuery';
import GetMetadataFileQuery from '@file/Application/Queries/GetMetadataFileQuery';
import IFileRepository from '@file/Domain/Repositories/IFileRepository';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IFilesystem } from '@shared/Filesystem/IFilesystem';
import IdPayload from '@shared/Payloads/IdPayload';
import { IdSchemaValidation } from '@shared/Validations/IdSchemaValidation';
import ValidatedHandler from '@shared/Validations/ValidatedHandler';

interface DownloadFileDto
{
    stream: Readable;
    mimeType: string;
    fileName: string;
}

@QueryHandler(DownloadFileQuery)
class DownloadFileHandler extends ValidatedHandler<GetMetadataFileQuery, DownloadFileDto> implements IQueryHandler<DownloadFileQuery>
{
    constructor(private repository: IFileRepository, private filesystem: IFilesystem)
    {
        super(IdSchemaValidation);
    }

    async execute(query: GetMetadataFileQuery): Promise<DownloadFileDto>
    {
        const payload = await this.validate<IdPayload>(query);

        const file = await this.repository.getOne(payload.id);

        const stream = await this.filesystem.downloadFile({
            objectName: file.path
        });

        return {
            stream,
            mimeType: file.mimeType,
            fileName: file.fileName
        };
    }
}

export default DownloadFileHandler;
