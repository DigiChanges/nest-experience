import { Injectable } from '@nestjs/common';
import { ErrorException } from '@shared/Exceptions/ErrorException';
import { GeneralErrorType } from '@shared/Exceptions/GeneralErrorType';
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
      throw new ErrorException({
        message: error?.message || 'Unexpected error occurred while fetching user.',
        type: GeneralErrorType.UNEXPECTED_ERROR,
        metadata: {
          additionalInfo: 'Error while accessing external user service.'
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
      throw new ErrorException({
        message: error?.message || 'Unexpected error occurred while fetching user.',
        type: GeneralErrorType.UNEXPECTED_ERROR,
        metadata: {
          additionalInfo: 'Error while accessing external user service.'
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
      throw new ErrorException({
        message: error.message || 'An unexpected error occurred.',
        type: GeneralErrorType.UNEXPECTED_ERROR,
        metadata: {
          additionalInfo: 'An error occurred while processing the request.'
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
      throw new ErrorException({
        message: error.message || 'An unexpected error occurred while adding permissions.',
        type: GeneralErrorType.UNEXPECTED_ERROR
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
      throw new ErrorException({
        message: error.message || 'An unexpected error occurred while removing permissions.',
        type: GeneralErrorType.UNEXPECTED_ERROR
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
      throw new ErrorException({
        message: error.message || 'An unexpected error occurred while getting Roles.',
        type: GeneralErrorType.UNEXPECTED_ERROR
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
      throw new ErrorException({
        message: error.message || 'An unexpected error occurred while adding roles.',
        type: GeneralErrorType.UNEXPECTED_ERROR
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
      throw new ErrorException({
        message: error.message || 'An unexpected error occurred.',
        type: GeneralErrorType.UNEXPECTED_ERROR
      });
    }
  }
}

export default AuthSupabaseRepository;
