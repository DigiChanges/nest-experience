import { IdSchemaValidation } from '@shared/Validations/IdSchemaValidation';

import { MultipartFileSchemaValidation } from './MultipartFileSchemaValidation';

const FileSchemaUpdateValidation = MultipartFileSchemaValidation.merge(IdSchemaValidation);

export default FileSchemaUpdateValidation;
