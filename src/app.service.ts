import { Injectable, Logger } from '@nestjs/common';
import { RequestService } from './request.service';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);
  constructor(private readonly requestService: RequestService) {}

  getHello(): any {
    const userId = this.requestService.getUserId();
    this.logger.debug(AppService.name);

    return {
      userId,
      additionalDetails: null,
    };
  }
}
