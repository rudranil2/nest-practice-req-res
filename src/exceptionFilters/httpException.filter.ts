import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    this.logger.debug('HttpExceptionFilter called...');

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    // console.log(JSON.stringify(exception, null, 2));

    const status = exception.getStatus();
    const error = exception.getResponse();

    //*You can do your custom error handling or modification here

    response.status(status).json({
      path: `${request.method} ${request.url}`,
      statusCode: status,
      details: error,
    });
  }
}
