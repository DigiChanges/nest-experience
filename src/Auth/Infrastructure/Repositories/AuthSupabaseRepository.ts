import { Injectable } from '@nestjs/common';
import { ErrorHttpException } from '@shared/Exceptions/ErrorHttpException';
import { StatusCode } from '@shared/Utils/StatusCode';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

import IPermissionDomain from '../../Domain/Entities/IPermissionDomain';
import IRoleDomain from '../../Domain/Entities/IRoleDomain';
import IRolePermissionDomain from '../../Domain/Entities/IRolePermissionDomain';
import IUserDomain from '../../Domain/Entities/IUserDomain';
import PermissionPayload from '../../Domain/Payloads/PermissionPayload';
import IAuthRepository from '../../Domain/Repositories/IAuthRepository';


type AuthSupabaseConfig = {
    authHost: string;
    authApiKey: string;
}

@Injectable()
class AuthSupabaseRepository implements IAuthRepository
{
  #client: SupabaseClient;

  constructor(config: AuthSupabaseConfig)
  {
    this.#client = createClient(config.authHost, config.authApiKey);
  }

  public async checkPermissions({ userId, permission }: PermissionPayload): Promise<boolean>
  {
    const { data, error } = await this
      .#client
      .rpc('get_authorization', {
        field_user_id: userId,
        permission_name: permission
      });

    if (error)
    {
      throw new ErrorHttpException({
        statusCode: StatusCode.HTTP_INTERNAL_SERVER_ERROR,
        errorMessage: {
          message: error.message
        }
      });
    }

    return data;
  }

  public async getAuthUser(info: string): Promise<IUserDomain>
  {
    const { data, error } = await this
      .#client
      .auth.getUser(info);

    if (error || !data?.user)
    {
      throw new ErrorHttpException({
        statusCode: StatusCode.HTTP_INTERNAL_SERVER_ERROR,
        errorMessage: {
          message: error.message
        }
      });
    }

    return {
      id: data?.user.id,
      email: data?.user.email,
      phone: data?.user.phone
    };
  }

  public async getPermissions(): Promise<IPermissionDomain[]>
  {
    const { data, error } = await this
      .#client
      .from('permissions')
      .select('*');

    if (error)
    {
      throw new ErrorHttpException({
        statusCode: StatusCode.HTTP_INTERNAL_SERVER_ERROR,
        errorMessage: {
          message: error.message
        }
      });
    }

    return data;
  }

  public async addPermissions(permissions: string[]): Promise<void>
  {
    const insertPermissions = permissions.map(permission => ({ name: permission }));

    const { error } = await this
      .#client
      .from('permissions')
      .insert(insertPermissions);

    if (error)
    {
      throw new ErrorHttpException({
        statusCode: StatusCode.HTTP_INTERNAL_SERVER_ERROR,
        errorMessage: {
          message: error.message
        }
      });
    }
  }

  public async removePermissions(permissions: string[]): Promise<void>
  {
    const { error } = await this
      .#client
      .from('permissions')
      .delete()
      .in('name', permissions);

    if (error)
    {
      throw new ErrorHttpException({
        statusCode: StatusCode.HTTP_INTERNAL_SERVER_ERROR,
        errorMessage: {
          message: error.message
        }
      });
    }
  }

  public async getRoles(): Promise<IRoleDomain[]>
  {
    const { data, error } = await this
      .#client
      .from('roles')
      .select();

    if (error)
    {
      throw new ErrorHttpException({
        statusCode: StatusCode.HTTP_INTERNAL_SERVER_ERROR,
        errorMessage: {
          message: error.message
        }
      });
    }

    return data;
  }

  public async addRoles(roles: IRoleDomain[]): Promise<void>
  {
    const { error } = await this
      .#client
      .from('roles')
      .insert(roles);

    if (error)
    {
      throw new ErrorHttpException({
        statusCode: StatusCode.HTTP_INTERNAL_SERVER_ERROR,
        errorMessage: {
          message: error.message
        }
      });
    }
  }

  public async addRolesHasPermissions(rolePermissionDomain: IRolePermissionDomain[]): Promise<void>
  {
    const { error } = await this
      .#client
      .from('roles_has_permissions')
      .upsert(rolePermissionDomain);

    if (error)
    {
      throw new ErrorHttpException({
        statusCode: StatusCode.HTTP_INTERNAL_SERVER_ERROR,
        errorMessage: {
          message: error.message
        }
      });
    }
  }
}

export default AuthSupabaseRepository;
