import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import IAuthorizeService from './IAuthorizeService';

import IDecodeToken from '../Models/IDecodeToken';
import * as jwt from 'jwt-simple';
import IAuthRepository from '../Repositories/IAuthRepository';
import IUserDomain from '../Entities/IUserDomain';
import { ForbiddenException, Injectable } from '@nestjs/common';

@Injectable()
class AuthorizeSupabaseService implements IAuthorizeService
{
  // TODO: Implement ENV.
  #config = {
    JWT_ISS: 'digichanges',
    JWT_AUD: 'digichanges.com',
    JWT_SECRET: '/GQkQAcJBOiq1wob2aBOG3F0YUfLncJ8nzjVvcS+K8P8JDHz8CgwOLUCYvlui4Jx5/3CGAWl3JarJYHyn6DOkg=='
  };

  constructor(private readonly repository: IAuthRepository) {}

  public getConfirmationToken(email: string): string
  {
    dayjs.extend(utc);
    const expires = dayjs.utc().add(5, 'minute').unix();

    const payload = {
      iss: this.#config.JWT_ISS,
      aud: this.#config.JWT_AUD,
      sub: email,
      iat: expires,
      exp: expires,
      email
    };

    return jwt.encode(payload, this.#config.JWT_SECRET, 'HS512');
  }

  public decodeToken(token: string): IDecodeToken
  {
    return jwt.decode(token, this.#config.JWT_SECRET, false);
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
