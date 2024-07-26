import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import IAuthorizeService from './IAuthorizeService';

import IDecodeToken from '../Models/IDecodeToken';
import * as jwt from 'jwt-simple';
import IAuthRepository from '../Repositories/IAuthRepository';
import IUserDomain from '../Entities/IUserDomain';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
class AuthorizeSupabaseService implements IAuthorizeService
{
  private readonly config: {
    JWT_ISS: string;
    JWT_AUD: string;
    JWT_SECRET: string;
  };
  constructor(
    private readonly repository: IAuthRepository,
    private readonly configService: ConfigService
  )
{
    this.config = {
      JWT_ISS: this.configService.get<string>('JWT_ISS'),
      JWT_AUD: this.configService.get<string>('JWT_AUD'),
      JWT_SECRET: this.configService.get<string>('JWT_SECRET')
    };
  }

  public getConfirmationToken(email: string): string
{
    dayjs.extend(utc);
    const expires = dayjs.utc().add(5, 'minute').unix();

    const payload = {
      iss: this.config.JWT_ISS,
      aud: this.config.JWT_AUD,
      sub: email,
      iat: expires,
      exp: expires,
      email
    };

    return jwt.encode(payload, this.config.JWT_SECRET, 'HS512');
  }

  public decodeToken(token: string): IDecodeToken
{
    return jwt.decode(token, this.config.JWT_SECRET, false);
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
