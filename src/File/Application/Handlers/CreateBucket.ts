import CreateBucketPayload from '../../Domain/Payloads/CreateBucketPayload';
import CreateBucketQuery from '../Queries/CreateBucketQuery';
import FileService from '../Services/FileService';
import { QueryHandler } from '@nestjs/cqrs';

@QueryHandler(CreateBucketQuery)
class CreateBucket
{
  #fileService = new FileService();

  async execute(query: CreateBucketPayload)
{
    await this.#fileService.createBucket(query);
  }
}
export default CreateBucket;
