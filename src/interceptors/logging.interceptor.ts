/* eslint-disable prettier/prettier */
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { RequestService } from 'src/request.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  constructor(private readonly requestService: RequestService) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    const request = context.switchToHttp().getRequest();

    const userAgent = request.get('user-agent') || '';      //*This can also be extracted from req.headers[user-agent]

    const { ip, method, url } = request;
    this.logger.debug(`'${method}' '${url}' '${userAgent}' '${ip}': '${context.getClass().name}' '${context.getHandler().name}' invoked....`);

    //Making sure the execution is proper i.e. middleware -> guard -> interceptor
    this.logger.debug(`userId : ${this.requestService.getUserId()}`);

    //*Now we are catching the response stream coming from the route handler i.e. the controller -> service method 
    const now = Date.now();
    return next.handle().pipe(
        tap((res) => {

            //!Catching the response from ExecutionContext
            const response = context.switchToHttp().getResponse();   

            const { statusCode } = response;
            const contentLength = response.get('content-length');

            this.logger.debug(`'${method}' '${url}' '${statusCode}' '${contentLength}' - '${userAgent}' '${ip}': Request took...${Date.now() - now} ms `);
            
            //!HERE, we are catching the response from rxjs observable
            this.logger.debug(`Response received`, res);
        })
    )
  }
}
