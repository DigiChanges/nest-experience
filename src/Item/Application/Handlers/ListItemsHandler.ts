import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import ListItemQuery from '../Queries/ListItemQuery';

import { IPaginator } from '@shared/Criteria/IPaginator';
import IItemRepository from '../../Domain/Repositories/IItemRepository';
import CriteriaSchemaValidation from '../../../Shared/Payloads/CriteriaSchemaValidation';
import ValidatedHandler from '../../../Shared/Handlers/ValidatedHandler';
import { ICriteria } from '@shared/Criteria/ICriteria';

@QueryHandler(ListItemQuery)
class ListItemsHandler extends ValidatedHandler<ListItemQuery> implements IQueryHandler<ListItemQuery>
{
    constructor(private repository: IItemRepository)
    {
        super(CriteriaSchemaValidation);
    }

    async execute(query: ListItemQuery): Promise<IPaginator>
    {
        const payload = await this.validate<ICriteria>(query);

        return this.repository.list(payload);
    }
}

export default ListItemsHandler;
