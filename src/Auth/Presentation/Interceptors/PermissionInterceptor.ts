import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { ErrorException } from '@shared/Exceptions/ErrorException';
import { GeneralErrorType } from '@shared/Exceptions/GeneralErrorType';
import { PERMISSION } from '@src/Auth/Presentation/Decorators/PermissionDecorator';
import { Observable } from 'rxjs';

import IAuthorizeService from '../../Domain/Services/IAuthorizeService';

@Injectable()
export class PermissionsInterceptor implements NestInterceptor
{
    constructor(
        private readonly reflector: Reflector,
        private authorizeService: IAuthorizeService,
        // TODO: Change this when env variables are implemented with useFactory.
        private configService: ConfigService
    )
    {
    }

    async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>>
{
        const config = this.configService.get('AUTH_AUTHORIZATION');

        if (config === 'TRUE')
        {
            try
            {
                const request = context.switchToHttp().getRequest();
                const authorizationHeader = request.headers.authorization;

                if (!authorizationHeader)
                {
                    throw new ErrorException({
                        message: 'Authorization token not found.',
                        type: GeneralErrorType.UNAUTHORIZED
                    });
                }

                const token = authorizationHeader.split(' ')[1];
                const decode = this.authorizeService.decodeToken(token);
                const permission = this.reflector.getAllAndOverride(PERMISSION, [
                    context.getHandler()
                ]);
                await this.authorizeService.authorize(decode.sub, permission);
                request['user'] = await this.authorizeService.getAuthUser(token);
                return next
                    .handle();
            }
            catch
            {
                throw new ErrorException({
                    message: 'Unauthorized',
                    type: GeneralErrorType.UNAUTHORIZED
                });
            }
        }
        else
        {
            return next.handle();
        }
    }
}
