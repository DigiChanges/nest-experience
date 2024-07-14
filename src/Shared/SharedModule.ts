import { Module } from '@nestjs/common';
import Responder from './Utils/Responder';

@Module({
  providers: [
      Responder
  ],
  exports: [Responder]
})
export class SharedModule {}
