import Query from '@shared/Cqrs/Query';
import IdPayload from '@shared/Payloads/IdPayload';

class DownloadFileQuery extends Query<IdPayload> { }

export default DownloadFileQuery;