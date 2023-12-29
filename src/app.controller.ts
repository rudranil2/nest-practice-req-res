/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller,
  Get,
  Post,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { AppService } from './app.service';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { SampleDto } from './dto/sample.dto';
import { StringTransformPipe } from './pipes/stringToInt.pipe';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  // @UseInterceptors(LoggingInterceptor)       //* This is how you add interceptor to a route handler
  getHello(): any {
    return this.appService.getHello();
  }

  @Post()
  @UsePipes(new StringTransformPipe())
  sayHello(@Body() dto: SampleDto): boolean {
    return this.appService.sayHello(dto);
  }
}
