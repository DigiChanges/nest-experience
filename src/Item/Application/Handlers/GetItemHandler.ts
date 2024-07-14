import GetItemQuery from '../Queries/GetItemQuery';
import IItemDomain from '../../Domain/Entities/IItemDomain';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import ValidatedHandler from '../../../Shared/Handlers/ValidatedHandler';
import { IdSchemaValidation } from '../../../Shared/Validations/IdSchemaValidation';
import IItemRepository from '../../Domain/Repositories/IItemRepository';
import IdPayload from '../../../Shared/Payloads/IdPayload';

@QueryHandler(GetItemQuery)
class GetItemHandler extends ValidatedHandler<GetItemQuery> implements IQueryHandler<GetItemQuery>
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
