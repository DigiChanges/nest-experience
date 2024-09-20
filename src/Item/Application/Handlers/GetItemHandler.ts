import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IdSchemaValidation } from '@shared/Validations/IdSchemaValidation';
import ValidatedHandler from '@shared/Validations/ValidatedHandler';

import IdPayload from '../../../Shared/Payloads/IdPayload';
import IItemDomain from '../../Domain/Entities/IItemDomain';
import IItemRepository from '../../Domain/Repositories/IItemRepository';
import GetItemQuery from '../Queries/GetItemQuery';

@QueryHandler(GetItemQuery)
class GetItemHandler extends ValidatedHandler<GetItemQuery, IItemDomain> implements IQueryHandler<GetItemQuery>
{
    constructor(private repository: IItemRepository)
    {
        super(IdSchemaValidation);
    }

    async execute(query: GetItemQuery): Promise<IItemDomain>
    {
        const payload = await this.validate<IdPayload>(query);

        return await this.repository.getOne(payload.id);
    }
}

export default GetItemHandler;
