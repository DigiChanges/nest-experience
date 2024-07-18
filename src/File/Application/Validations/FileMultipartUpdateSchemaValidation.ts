import FileMultipartSchemaValidation from './FileMultipartSchemaValidation';
import { IdSchemaValidation } from '../../../Shared/Validations/IdSchemaValidation';

const FileMultipartUpdateSchemaValidation =
  FileMultipartSchemaValidation.merge(IdSchemaValidation);

export default FileMultipartUpdateSchemaValidation;
