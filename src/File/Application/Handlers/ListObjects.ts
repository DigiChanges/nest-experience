import FileService from '../Services/FileService';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import ValidatedHandler from '../../../Shared/Handlers/ValidatedHandler';
import CriteriaSchemaValidation from '../../../Shared/Payloads/CriteriaSchemaValidation';
import { IPaginator } from '../../../Shared/Criteria/IPaginator';
import { ICriteria } from '../../../Shared/Criteria/ICriteria';
import ListObjectsQuery from '../Queries/ListObjectsQuery';


@QueryHandler(ListObjectsQuery)
class ListObjectsHandler extends ValidatedHandler<ListObjectsQuery> implements IQueryHandler<ListObjectsQuery>
{
    #fileService = new FileService();
    constructor()
    {
        super(CriteriaSchemaValidation);
    }

    async execute(query: ListObjectsQuery): Promise<IPaginator>
    {
        const payload = await this.validate<ICriteria>(query);

        return this.#fileService.list(payload);
    }
}

export default ListObjectsHandler;
