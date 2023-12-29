/* eslint-disable prettier/prettier */
import {
  ArgumentMetadata,
  Injectable,
  Logger,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class FreezeInputPipe implements PipeTransform {
  private readonly logger = new Logger(FreezeInputPipe.name);

  transform(value: any, _: ArgumentMetadata) {
    this.logger.debug(`${FreezeInputPipe.name} running....`);

    Object.freeze(value);           //* This won't allow new properties to be added to the payload. Making the object immutable
    return value;
  }
}
