import RemoveFileCommand from '@file/Application/Commands/RemoveFileCommand';
import IFileRepository from '@file/Domain/Repositories/IFileRepository';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IFilesystem } from '@shared/Filesystem/IFilesystem';
import IdPayload from '@shared/Payloads/IdPayload';
import { IdSchemaValidation } from '@shared/Validations/IdSchemaValidation';
import ValidatedHandler from '@shared/Validations/ValidatedHandler';
import IFileDomain from '@file/Domain/Entities/IFileDomain';

@CommandHandler(RemoveFileCommand)
class RemoveFileHandler extends ValidatedHandler<RemoveFileCommand, any> implements ICommandHandler<RemoveFileCommand>
{
    constructor(private repository: IFileRepository, private filesystem: IFilesystem)
    {
        super(IdSchemaValidation);
    }

    async execute(command: RemoveFileCommand): Promise<IFileDomain>
    {
        const { id } = await this.validate<IdPayload>(command);

        const file = await this.repository.getOne(id);

        await this.filesystem.removeObject({
            objectName: file.path,
            isPublic: file.isPublic
        });

        return await this.repository.delete(id);
    }
}

export default RemoveFileHandler;
