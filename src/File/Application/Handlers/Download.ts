import IFileVersionDTO from '../../Domain/Models/IFileVersionDTO';
import FileService from '../Services/FileService';
import ValidatedHandler from '../../../Shared/Handlers/ValidatedHandler';
import DownloadSchemaValidation from '../Validations/DownloadSchemaValidation';
import DownloadQuery from '../Queries/DowloadQuery';
import { QueryHandler } from '@nestjs/cqrs';
import DownloadPayload from "../../Domain/Payloads/DownloadPayload";

@QueryHandler(DownloadQuery)
class Download extends ValidatedHandler<DownloadQuery>
{
  #fileService = new FileService();
  constructor()
{
    super(DownloadSchemaValidation);
  }
  async execute(query: DownloadQuery): Promise<IFileVersionDTO>
{
    const payload = await this.validate<DownloadPayload>(query);
    return await this.#fileService.download(payload);
  }
}

export default Download;
