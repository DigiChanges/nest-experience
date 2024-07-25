import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import IAuthorizeService from './IAuthorizeService';

import IDecodeToken from '../Models/IDecodeToken';
import * as jwt from 'jwt-simple';
import IAuthRepository from '../Repositories/IAuthRepository';
import IUserDomain from '../Entities/IUserDomain';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { AppConfigService } from '@src/Config/AppConfigService';

@Injectable()
class AuthorizeSupabaseService implements IAuthorizeService
{
  constructor(
    private readonly repository: IAuthRepository,
    private readonly configService: AppConfigService
  )
  {}

  public getConfirmationToken(email: string): string
  {
    dayjs.extend(utc);
    const expires = dayjs.utc().add(5, 'minute').unix();

    const payload = {
      iss: this.configService.getEnv().JWT_ISS,
      aud: this.configService.getEnv().JWT_AUD,
      sub: email,
      iat: expires,
      exp: expires,
      email
    };

    return jwt.encode(payload, this.configService.getEnv().JWT_SECRET, 'HS512');
  }

  public decodeToken(token: string): IDecodeToken
  {
    return jwt.decode(token, this.configService.getEnv().JWT_SECRET, false);
  }

  public async authorize(userId: string, permission: string): Promise<void>
  {
    const verified = await this.repository.checkPermissions({ userId, permission });

    if (!verified)
    {
      throw new ForbiddenException();
    }
  }

  public async getAuthUser(data: string): Promise<IUserDomain>
  {
    return await this.repository.getAuthUser(data);
  }
}

export default AuthorizeSupabaseService;
