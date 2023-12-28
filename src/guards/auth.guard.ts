import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger(AuthGuard.name);

  canActivate(context: ExecutionContext) {
    this.logger.debug(AuthGuard.name);
    const request = context.switchToHttp().getRequest();
    // console.log(JSON.stringify(request.headers, null, 2));  // printing all the headers
    return true;
  }
}
