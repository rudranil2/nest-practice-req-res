import { Injectable, Logger } from '@nestjs/common';
import { RequestService } from './request.service';
import { SampleDto } from './dto/sample.dto';

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

  sayHello({ userId: payloadUserId }: SampleDto): boolean {
    const userId = this.requestService.getUserId();
    this.logger.debug(`${AppService.name} - 'sayHello' called`);

    //? Here, we are getting the transformed int of the Id sent from req.body.
    //? Forcefully converting the userId set from middleware to a number to see if the pipe transformation works properly
    return parseInt(userId) === (payloadUserId as unknown as number);
  }
}
