/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { LoggingInterceptor } from './interceptors/logging.interceptor';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  //* This is how you add interceptor to a route handler
  // @UseInterceptors(LoggingInterceptor)
  getHello(): any {
    return this.appService.getHello();
  }
}
