import OptimizeSchemaValidation from '../Validations/OptimizeSchemaValidation';
import ValidatedHandler from '../../../Shared/Handlers/ValidatedHandler';
import OptimizeQuery from '../Queries/OptimizeQuery';
import { QueryHandler } from '@nestjs/cqrs';
import FileService from '../Services/FileService';
import IFileVersionDomain from '../../Domain/Entities/IFileVersionDomain';
import FileVersion from '../../Domain/Entities/FileVersion';
import FileDTO from '../../Domain/Models/FileDTO';
import OptimizePayload from "../../Domain/Payloads/OptimizePayload";


@QueryHandler(OptimizeQuery)
class Optimize extends ValidatedHandler<OptimizeQuery>
{
    #fileService = new FileService();

    constructor()
{
        super(OptimizeSchemaValidation);
    }

    async execute(query: OptimizeQuery): Promise<FileDTO>
{

    const payload = await this.validate<OptimizePayload>(query);

    const { id } = payload;
        let file = await this.#fileService.getOne(id);
        const fileVersions = await this.#fileService.getVersions(id);
        const lastVersion = fileVersions.find(v => v.version === file.currentVersion);

        const optimizing = lastVersion && !lastVersion.isOptimized && lastVersion.isImage;

        if (optimizing)
        {
            const optimizePayload = await this.#fileService.optimizeFileVersion(lastVersion);

            const build = {
                originalName: optimizePayload.originalName,
                isOriginalName: payload.isOriginalName,
                mimeType: optimizePayload.mimeType,
                extension: optimizePayload.extension,
                isPublic: payload.isPublic,
                size: optimizePayload.size,
                path: optimizePayload.path,
                isOptimized: true,
                file
            };

            let newFileVersion: IFileVersionDomain = new FileVersion(build);
            newFileVersion = await this.#fileService.persistVersion(newFileVersion);
            await this.#fileService.uploadFileVersionOptimized(newFileVersion, optimizePayload);
            file = await this.#fileService.update(file);

            fileVersions.push(newFileVersion);
        }

        return new FileDTO(file, fileVersions);
    }
}

export default Optimize;
