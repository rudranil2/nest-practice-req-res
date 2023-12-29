import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  Logger,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class StringTransformPipe implements PipeTransform {
  private readonly logger = new Logger(StringTransformPipe.name);

  transform(value: any, metadata: ArgumentMetadata) {
    this.logger.debug(`Inside ${StringTransformPipe.name}`);

    switch (metadata.type) {
      case 'body': {
        const { userId } = value;
        // eslint-disable-next-line prettier/prettier
        if (userId && typeof userId === 'string') {                          //*Here, you would typically do the schema validation with a schema
          const transformedUserId = parseInt(userId);
          if (Number.isNaN(transformedUserId))
            throw new BadRequestException('Invalid Id');

          value['userId'] = transformedUserId;
          return value;
        }
      }

      default:
        return value;
    }
  }
}

//? What i'm trying here is to send a string from req.body and convert it to a number, - to demonstrate the transformation
