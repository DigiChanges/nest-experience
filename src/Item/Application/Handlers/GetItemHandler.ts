import GetItemQuery from '../Queries/GetItemQuery';
import IItemDomain from '../../Domain/Entities/IItemDomain';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IdSchemaValidation } from '@shared/Validations/IdSchemaValidation';
import IItemRepository from '../../Domain/Repositories/IItemRepository';
import IdPayload from '../../../Shared/Payloads/IdPayload';
import ValidatedHandler from '@shared/Handlers/ValidatedHandler';

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
