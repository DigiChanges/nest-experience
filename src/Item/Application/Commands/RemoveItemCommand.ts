import IdPayload from '../../../Shared/Payloads/IdPayload';

class RemoveItemCommand
{
    constructor(public payload: IdPayload)
    {}
}

export default RemoveItemCommand;
