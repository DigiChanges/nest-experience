import CreateBucketCommand from '@file/Application/Commands/CreateBucketCommand';
import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IFilesystem } from '@shared/Filesystem/IFilesystem';
import { CreateBucketPayload } from '@shared/Filesystem/Payloads';
import CreateBucketCommandRequest from '@file/Presentation/Requests/CreateBucketCommandRepRequest';
import ICreateBucketCommandRequest from '@file/Presentation/Requests/ICreateBucketCommandRequest';

interface IStatementPolicy
{
  Effect: string;
  Principal: Record<string, string>;
  Action: string[];
  Resource: string[];
}

interface IBucketPolicy
{
  Version: string;
  Statement: IStatementPolicy[];
}

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
