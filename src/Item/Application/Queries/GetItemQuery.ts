import Query from '@shared/Cqrs/Query';
import IdPayload from '@shared/Payloads/IdPayload';

class GetItemQuery extends Query<IdPayload> { }

export default GetItemQuery;

