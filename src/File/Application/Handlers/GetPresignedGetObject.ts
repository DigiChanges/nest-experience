import ValidatedHandler from 'src/Shared/Handlers/ValidatedHandler';
import FileService from '../Services/FileService';
import PresignedFileSchemaValidation from '../Validations/PresignedFileSchemaValidation';
import { QueryHandler } from '@nestjs/cqrs';
import GetPresignedGetObjectQuery from '../Queries/GetPresignedGetObjectQuery';
import PresignedFileRepPayload from "../../Domain/Payloads/PresignedFileRepPayload";
import ItemRepPayload from "../../../Item/Domain/Payloads/ItemRepPayload";

@QueryHandler(GetPresignedGetObjectQuery)
class GetPresignedGetObject extends ValidatedHandler<GetPresignedGetObjectQuery>
{
  #fileService = new FileService();
  constructor()
  {
    super(PresignedFileSchemaValidation);
  }
  async execute(query: GetPresignedGetObjectQuery): Promise<string>
  {
    const payload = await this.validate<PresignedFileRepPayload>(query);
    return this.#fileService.getPresignedGetObject(payload);
  }
}

export default GetPresignedGetObject;




