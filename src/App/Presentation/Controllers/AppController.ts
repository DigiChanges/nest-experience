import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController
{
  constructor() {}

  @Get()
  getIndex(): { message: string }
  {
    return {
      message: 'Welcome to Nest Experience'
    };
  }
}
