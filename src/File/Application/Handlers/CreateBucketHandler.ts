import CreateBucketCommand from '@file/Application/Commands/CreateBucketCommand';
import ICreateBucketCommandRequest from '@file/Presentation/Requests/ICreateBucketCommandRequest';
import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IFilesystem } from '@shared/Filesystem/IFilesystem';

@CommandHandler(CreateBucketCommand)
class CreateBucketHandler implements ICommandHandler<CreateBucketCommand>
{
  constructor(
    private fileService: IFilesystem,
    private createBucketRequest: ICreateBucketCommandRequest
  ) {}
  async execute(): Promise<void>
  {
    await this.fileService.createBucket(this.createBucketRequest);

    Logger.log('Bucket was created successfully');
  }
}

export default CreateBucketHandler;
