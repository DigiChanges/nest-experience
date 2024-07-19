import PresignedFileRepPayload from '../../Domain/Payloads/PresignedFileRepPayload';

class GetPresignedGetObjectQuery
{
    constructor(public payload: PresignedFileRepPayload) {}
}

export default GetPresignedGetObjectQuery;
