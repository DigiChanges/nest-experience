import IFileVersionDTO from '../../Domain/Models/IFileVersionDTO';
import FileService from '../Services/FileService';
import ValidatedHandler from '../../../Shared/Handlers/ValidatedHandler';
import DownloadSchemaValidation from '../Validations/DownloadSchemaValidation';
import DownloadQuery from '../Queries/DowloadQuery';
import { QueryHandler } from '@nestjs/cqrs';

@QueryHandler(DownloadQuery)
class Download extends ValidatedHandler<DownloadQuery> {
  #fileService = new FileService();
  constructor() {
    super(DownloadSchemaValidation);
  }
  async execute(query: DownloadQuery): Promise<IFileVersionDTO> {
    return await this.#fileService.download(query);
  }
}

export default Download;
