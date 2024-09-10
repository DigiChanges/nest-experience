import GetMetadataFileQuery from '@file/Application/Queries/GetMetadataFileQuery';
import IFileDomain from '@file/Domain/Entities/IFileDomain';
import IFileRepository from '@file/Domain/Repositories/IFileRepository';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import IdPayload from '@shared/Payloads/IdPayload';
import { IdSchemaValidation } from '@shared/Validations/IdSchemaValidation';
import ValidatedHandler from '@shared/Validations/ValidatedHandler';

@QueryHandler(GetMetadataFileQuery)
class GetMetadataFileHandler extends ValidatedHandler<GetMetadataFileQuery, IFileDomain> implements IQueryHandler<GetMetadataFileQuery>
{
    constructor(private repository: IFileRepository)
    {
        super(IdSchemaValidation);
    }

    async execute(query: GetMetadataFileQuery): Promise<IFileDomain>
    {
        const payload = await this.validate<IdPayload>(query);

        return await this.repository.getOne(payload.id); // TODO: Add URL file full path
    }
}

export default GetMetadataFileHandler;
