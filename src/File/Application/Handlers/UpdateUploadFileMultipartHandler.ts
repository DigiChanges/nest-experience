import UpdateUploadFileMultipartCommand from '@file/Application/Commands/UpdateUploadFileMultipartCommand';
import File from '@file/Domain/Entities/File';
import IFileDomain from '@file/Domain/Entities/IFileDomain';
import UpdateMultipartFilePayload from '@file/Domain/Payloads/UpdateMultipartFilePayload';
import IFileRepository from '@file/Domain/Repositories/IFileRepository';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import FileService from '@shared/Filesystem/FileService';
import { IFilesystem } from '@shared/Filesystem/IFilesystem';
import ValidatedHandler from '@shared/Validations/ValidatedHandler';

import { MultipartFileSchemaValidation } from '../Validations/MultipartFileSchemaValidation';

@CommandHandler(UpdateUploadFileMultipartCommand)
class UpdateUploadFileMultipartHandler extends ValidatedHandler<UpdateUploadFileMultipartCommand, IFileDomain> implements ICommandHandler<UpdateUploadFileMultipartCommand>
{
    constructor(private repository: IFileRepository,
                private filesystem: IFilesystem,
                private service: FileService)
    {
        super(MultipartFileSchemaValidation);
    }

    async execute(command: UpdateUploadFileMultipartCommand): Promise<any>
    {
        const payload = await this.validate<UpdateMultipartFilePayload>(command);

        const originalFile: IFileDomain = await this.repository.getOne(payload.id);

        if (!originalFile.isOriginal()) // TODO: Replace for a repository query
        {
            throw new Error('Original file is required.');
        }

        const file: IFileDomain = new File();
        const newVersion = file.version + 1;
        const objectName = this.service.convertToUrlFriendly(payload.originalFilename);
        const objectPath = this.service.addNewFilePath(originalFile.originalFileId, newVersion, objectName);

        await this.filesystem.uploadFile({
          objectPath,
          fileTempPath: payload.path,
          size: payload.size,
          isPublic: true
        });

        file.originalFileId = originalFile.originalFileId;
        file.fileName = payload.filename;
        file.name = objectName;
        file.originalName = payload.originalFilename;
        file.mimeType = payload.mimetype;
        file.path = objectPath;
        file.extension = this.service.getFileExtension(payload.filename);
        file.size = payload.size;
        file.version = newVersion;
        file.encoding = payload.encoding;
        file.isPublic = true;
        file.isOptimized = false;

        return await this.repository.save(file);
    }
}

export default UpdateUploadFileMultipartHandler;
