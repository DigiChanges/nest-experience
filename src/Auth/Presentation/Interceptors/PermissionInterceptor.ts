import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Inject } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import AuthorizeSupabaseService from '../../Domain/Services/AuthorizeSupabaseService';
import IAuthorizeService from '../../Domain/Services/IAuthorizeService';

@Injectable()
export class PermissionsInterceptor implements NestInterceptor
{
  permission: string;
  constructor(
    permission: string,
    @Inject(IAuthorizeService) private authorizeService: IAuthorizeService
  )
  {
    this.permission = permission;
  }
  intercept(context: ExecutionContext, next: CallHandler): Observable<any>
  {
    console.log(this.authorizeService);

    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(() => console.log(`${this.permission}... ${Date.now() - now}ms`))
      );
  }
}
