/* eslint-disable prettier/prettier */
import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { RequestService } from 'src/request.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private readonly logger = new Logger(AuthMiddleware.name);

  constructor(private readonly requestService: RequestService) {}

  use(req: Request, res: Response, next: NextFunction) {

    this.logger.debug('Inside AuthMiddleware');

    // Authenticate the request
    
    const userId = '123';
    this.requestService.setUserId(userId); //Simulating setting the req.user after using passport strategy

    next();     //next call similar to express
  }
}
