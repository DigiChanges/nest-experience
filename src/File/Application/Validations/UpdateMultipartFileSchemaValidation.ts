import { MultipartFileSchemaValidation } from '@file/Application/Validations/MultipartFileSchemaValidation';
import { IdSchemaValidation } from '@shared/Validations/IdSchemaValidation';

const UpdateMultipartFileSchemaValidation = MultipartFileSchemaValidation.merge(IdSchemaValidation);

export default UpdateMultipartFileSchemaValidation;
