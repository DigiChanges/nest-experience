import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ICriteria } from '@shared/Criteria/ICriteria';
import { IPaginator } from '@shared/Criteria/IPaginator';
import ValidatedHandler from '@shared/Validations/ValidatedHandler';

import CriteriaSchemaValidation from '../../../Shared/Payloads/CriteriaSchemaValidation';
import IFileRepository from '../../Domain/Repositories/IFileRepository';
import ListFileQuery from '../Queries/ListFileQuery';


@QueryHandler(ListFileQuery)
class ListFilesHandler extends ValidatedHandler<ListFileQuery, IPaginator> implements IQueryHandler<ListFileQuery>
{
    constructor(private repository: IFileRepository)
    {
        super(CriteriaSchemaValidation);
    }

    async execute(query: ListFileQuery): Promise<IPaginator>
    {
        const payload = await this.validate<ICriteria>(query);

        return this.repository.list(payload);
    }
}

export default ListFilesHandler;
