import FileService from '../Services/FileService';

import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import ValidatedHandler from '../../../Shared/Handlers/ValidatedHandler';
import CriteriaSchemaValidation from '../../../Shared/Payloads/CriteriaSchemaValidation';
import ListFilesQuery from '../Queries/ListFilesQuery';
import { IPaginator } from '../../../Shared/Criteria/IPaginator';
import { ICriteria } from '../../../Shared/Criteria/ICriteria';


@QueryHandler(ListFilesQuery)
class ListFilesHandler extends ValidatedHandler<ListFilesQuery> implements IQueryHandler<ListFilesQuery>
{
    #fileService = new FileService();
    constructor()
    {
        super(CriteriaSchemaValidation);
    }

    async execute(query: ListFilesQuery): Promise<IPaginator>
    {
        const payload = await this.validate<ICriteria>(query);

        return this.#fileService.list(payload);
    }
}

export default ListFilesHandler;
