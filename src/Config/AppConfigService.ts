import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppConfigService
{
  constructor(private readonly configService: ConfigService) {}

  public getEnv()
  {
    return this.configService.get('app');
  }

  get appAuthHost()
  {
        return this.configService.get('app');
  }

  get appAuthApiKey()
  {
    return this.configService.get('app.AUTH_API_KEY');
  }

  get appMongoUri()
  {
    return this.configService.get('app.MONGO_URI');
  }
}
