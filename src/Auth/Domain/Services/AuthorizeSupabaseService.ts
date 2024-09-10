import { ForbiddenException, Injectable } from '@nestjs/common';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import * as jwt from 'jwt-simple';

import IUserDomain from '../Entities/IUserDomain';
import IDecodeToken from '../Models/IDecodeToken';
import IAuthRepository from '../Repositories/IAuthRepository';

import IAuthorizeService from './IAuthorizeService';

type AuthServiceConfig = {
    jwtIss: string;
    jwtAud: string;
    jwtSecret: string;
}

@Injectable()
class AuthorizeSupabaseService implements IAuthorizeService
{
  constructor(private readonly repository: IAuthRepository, private readonly config: AuthServiceConfig) {}

  public getConfirmationToken(email: string): string
{
    dayjs.extend(utc);
    const expires = dayjs.utc().add(5, 'minute').unix();

    const payload = {
      iss: this.config.jwtIss,
      aud: this.config.jwtAud,
      sub: email,
      iat: expires,
      exp: expires,
      email
    };

    return jwt.encode(payload, this.config.jwtSecret, 'HS512');
  }

  public decodeToken(token: string): IDecodeToken
{
    return jwt.decode(token, this.config.jwtSecret, false);
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
