import { ItemSchemaSaveValidation } from './ItemSchemaSaveValidation';
import { IdSchemaValidation } from '@src/Shared/Validations/IdSchemaValidation';

const ItemSchemaUpdateValidation = ItemSchemaSaveValidation.merge(IdSchemaValidation);

export default ItemSchemaUpdateValidation;
