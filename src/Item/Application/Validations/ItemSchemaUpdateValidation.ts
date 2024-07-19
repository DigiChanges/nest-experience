import { ItemSchemaSaveValidation } from './ItemSchemaSaveValidation';
import { IdSchemaValidation } from '@shared/Validations/IdSchemaValidation';

const ItemSchemaUpdateValidation = ItemSchemaSaveValidation.merge(IdSchemaValidation);

export default ItemSchemaUpdateValidation;
