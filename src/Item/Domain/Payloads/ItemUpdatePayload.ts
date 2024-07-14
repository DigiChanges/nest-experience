import ItemRepPayload from './ItemRepPayload';
import IdPayload from '../../../Shared/Payloads/IdPayload';

interface ItemUpdatePayload extends IdPayload, ItemRepPayload {}

export default ItemUpdatePayload;
