import { IdSchemaValidation } from '@shared/Validations/IdSchemaValidation';

import { ItemSchemaSaveValidation } from './ItemSchemaSaveValidation';

const ItemSchemaUpdateValidation = ItemSchemaSaveValidation.merge(IdSchemaValidation);

export default ItemSchemaUpdateValidation;
