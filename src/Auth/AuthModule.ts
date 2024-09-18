import { SyncRolesPermissionCommander } from '@auth/Presentation/Commands/SyncRolesPermissionCommander';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SharedModule } from '@shared/SharedModule';

import { QueryHandlers } from './Application/Handlers';
import IAuthRepository from './Domain/Repositories/IAuthRepository';
import AuthorizeSupabaseService from './Domain/Services/AuthorizeSupabaseService';
import IAuthorizeService from './Domain/Services/IAuthorizeService';
import AuthSupabaseRepository from './Infrastructure/Repositories/AuthSupabaseRepository';
import AuthController from './Presentation/Controllers/AuthController';



@Module({
  imports: [SharedModule],
  controllers: [AuthController],
  providers: [
    ...QueryHandlers,
    SyncRolesPermissionCommander,
    { provide: IAuthRepository,
      useFactory: async(configService: ConfigService) =>
      {
        const config = {
          authHost: configService.get<string>('AUTH_HOST'),
          authApiKey: configService.get<string>('AUTH_API_KEY')
        };

        return new AuthSupabaseRepository(config);
      },
      inject: [ConfigService]
    },
    { provide: IAuthorizeService,
      useFactory: async(configService: ConfigService, repository: IAuthRepository) =>
      {
        const config = {
          jwtIss: configService.get<string>('JWT_ISS'),
          jwtAud: configService.get<string>('JWT_AUD'),
          jwtSecret: configService.get<string>('JWT_SECRET')
        };

        return new AuthorizeSupabaseService(repository, config);
      },
      inject: [ConfigService, IAuthRepository]
    }
  ]
})

export class AuthModule {}
