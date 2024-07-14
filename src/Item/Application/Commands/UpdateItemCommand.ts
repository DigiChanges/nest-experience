import ItemUpdatePayload from '../../../Item/Domain/Payloads/ItemUpdatePayload';

class UpdateItemCommand
{
    constructor(public payload: ItemUpdatePayload)
    {}
}

export default UpdateItemCommand;
