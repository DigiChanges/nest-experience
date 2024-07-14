import ItemRepPayload from '../../Domain/Payloads/ItemRepPayload';

class SaveItemCommand
{
    constructor(public readonly payload: ItemRepPayload)
    {}
}

export default SaveItemCommand;
