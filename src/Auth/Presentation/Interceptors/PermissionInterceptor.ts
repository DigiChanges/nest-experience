import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Inject } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import AuthorizeSupabaseService from '../../Domain/Services/AuthorizeSupabaseService';
import IAuthorizeService from '../../Domain/Services/IAuthorizeService';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS } from '../Decorators/PermissionDecorator';
import TokenNotFoundHttpException from '../Exceptions/TokenNotFoundHttpException';
import authorizeSupabaseService from '../../Domain/Services/AuthorizeSupabaseService';
import IAuthRepository from '../../Domain/Repositories/IAuthRepository';
import AuthSupabaseRepository from '../../Infrastructure/Repositories/AuthSupabaseRepository';

@Injectable()
export class PermissionsInterceptor implements NestInterceptor
{
  constructor(
    private readonly reflector: Reflector,
    private authorizeService: IAuthorizeService
  )
  {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>>
  {
  const request = context.switchToHttp().getRequest();
  const authorizationHeader = request.headers.authorization;
  if (!authorizationHeader)
  {
    throw new TokenNotFoundHttpException();
  }

  const token = authorizationHeader.split(' ')[1];
  const decode = this.authorizeService.decodeToken(token);
  const permission = this.reflector.getAllAndOverride(PERMISSIONS, [
    context.getHandler()
  ]);

  await this.authorizeService.authorize(decode.sub, permission);

  request['user'] = await this.authorizeService.getAuthUser(token);

    return next
      .handle();
  }
}
