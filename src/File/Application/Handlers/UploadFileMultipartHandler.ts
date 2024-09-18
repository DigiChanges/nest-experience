import MultipartFilePayload from '@file/Domain/Payloads/MultipartFilePayload';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import FileService from '@shared/Filesystem/FileService';
import { IFilesystem } from '@shared/Filesystem/IFilesystem';
import ValidatedHandler from '@shared/Validations/ValidatedHandler';

import File from '../../Domain/Entities/File';
import IFileDomain from '../../Domain/Entities/IFileDomain';
import IFileRepository from '../../Domain/Repositories/IFileRepository';
import UploadFileMultipartCommand from '../Commands/UploadFileMultipartCommand';
import { MultipartFileSchemaValidation } from '../Validations/MultipartFileSchemaValidation';

@CommandHandler(UploadFileMultipartCommand)
class UploadFileMultipartHandler extends ValidatedHandler<UploadFileMultipartCommand, IFileDomain> implements ICommandHandler<UploadFileMultipartCommand>
{
    constructor(private repository: IFileRepository,
                private filesystem: IFilesystem,
                private service: FileService
    )
    {
        super(MultipartFileSchemaValidation);
    }

    async execute(command: UploadFileMultipartCommand): Promise<IFileDomain>
    {
        const payload = await this.validate<MultipartFilePayload>(command);

        const file: IFileDomain = new File();

        const objectName = this.service.convertToUrlFriendly(payload.originalFilename);
        const objectPath = this.service.addNewFilePath(file.originalFileId, 1, objectName);

        await this.filesystem.uploadFile({
          objectPath,
          fileTempPath: payload.path,
          size: payload.size,
          isPublic: true // TODO: Send it in payload by query param
        });

        file.fileName = payload.filename;
        file.name = objectName;
        file.originalName = payload.originalFilename;
        file.mimeType = payload.mimetype;
        file.path = objectPath;
        file.extension = this.service.getFileExtension(payload.filename);
        file.size = payload.size;
        file.version = 1;
        file.encoding = payload.encoding;
        file.isPublic = true;
        file.isOptimized = false;

        return await this.repository.save(file);
    }
}

export default UploadFileMultipartHandler;
