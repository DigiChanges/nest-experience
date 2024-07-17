import { Module } from '@nestjs/common';
import { QueryHandlers } from './Application/Handlers';
import AuthSupabaseRepository from './Infrastructure/Repositories/AuthSupabaseRepository';
import IAuthRepository from './Domain/Repositories/IAuthRepository';
import { SharedModule } from '../Shared/SharedModule';
import AuthController from './Presentation/Controllers/AuthController';

@Module({
  imports: [SharedModule],
  controllers: [AuthController],
  providers: [
    ...QueryHandlers,
    { provide: IAuthRepository, useClass: AuthSupabaseRepository }
  ]
})
export class AuthModule {}
