//import PresignedFileRepPayload from '../Payloads/PresignedFileRepPayload';
import ValidatedHandler from 'src/Shared/Handlers/ValidatedHandler';
import FileService from '../Services/FileService';
import PresignedFileSchemaValidation from '../Validations/PresignedFileSchemaValidation';
/*
class GetPresignedGetObjectUseCase {
  private fileService = new FileService();

  async handle(payload: PresignedFileRepPayload): Promise<string> {
    await ValidatorSchema.handle(PresignedFileSchemaValidation, payload);

    return this.fileService.getPresignedGetObject(payload);
  }
}*/

class GetPresignedGetObject extends ValidatedHandler<T> {
  #fileService = new FileService();

  async execute(query: T): Promise<string> {
    return this.#fileService.getPresignedGetObject(query);
  }
}

export default GetPresignedGetObject;
