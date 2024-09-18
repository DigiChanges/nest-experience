import CreateBucketCommand from '@file/Application/Commands/CreateBucketCommand';
import { CommandBus } from '@nestjs/cqrs';
import { Command, CommandRunner } from 'nest-commander';

@Command({ name: 'createBucket', description: 'Create Minio Bucket' })
export class CreateBucketCommander extends CommandRunner
{
  constructor(private commandBus: CommandBus)
  {
    super();
  }
  async run(): Promise<void>
  {
    await this.commandBus.execute(new CreateBucketCommand());
  }
}
