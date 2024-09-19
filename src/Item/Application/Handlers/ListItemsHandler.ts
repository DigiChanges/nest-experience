import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ICriteria } from '@shared/Criteria/ICriteria';
import { IPaginator } from '@shared/Criteria/IPaginator';
import ValidatedHandler from '@shared/Validations/ValidatedHandler';

import CriteriaSchemaValidation from '../../../Shared/Payloads/CriteriaSchemaValidation';
import IItemRepository from '../../Domain/Repositories/IItemRepository';
import ListItemQuery from '../Queries/ListItemQuery';

@QueryHandler(ListItemQuery)
class ListItemsHandler extends ValidatedHandler<ListItemQuery, IPaginator> implements IQueryHandler<ListItemQuery>
{
    constructor(private repository: IItemRepository)
    {
        super(CriteriaSchemaValidation);
    }

    async execute(query: ListItemQuery): Promise<IPaginator>
    {
        await this.validate<ICriteria>(query);

        return this.repository.list(query.payload);
    }
}

export default ListItemsHandler;
