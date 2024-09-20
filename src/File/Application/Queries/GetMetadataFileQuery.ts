import Query from '@shared/Cqrs/Query';
import IdPayload from '@shared/Payloads/IdPayload';

class GetMetadataFileQuery extends Query<IdPayload> { }

export default GetMetadataFileQuery;

