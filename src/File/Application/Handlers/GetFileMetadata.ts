import FileService from '../Services/FileService';
import FileDTO from '../../Domain/Models/FileDTO';
import IFileDTO from '../../Domain/Models/IFileDTO';
import ValidatedHandler from '../../../Shared/Handlers/ValidatedHandler';
import { IdSchemaValidation } from '../../../Shared/Validations/IdSchemaValidation';
import IdPayload from '../../../Shared/Payloads/IdPayload';
import { QueryHandler } from '@nestjs/cqrs';
import GetFileMetadataQuery from '../Queries/GetFileMetadaQuery';

@QueryHandler(GetFileMetadataQuery)
class GetFileMetadata extends ValidatedHandler<GetFileMetadataQuery> {
  #fileService = new FileService();
  constructor() {
    super(IdSchemaValidation);
  }
  async execute(query: GetFileMetadataQuery): Promise<IFileDTO> {
    const payload = await this.validate<IdPayload>(query);
    const file = await this.#fileService.getOne(payload.id);
    const fileVersions = await this.#fileService.getVersions(payload.id);

    return new FileDTO(file, fileVersions);
  }
}

export default GetFileMetadata;
