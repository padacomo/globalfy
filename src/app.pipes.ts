import { HttpStatus, PipeTransform, ValidationPipe } from '@nestjs/common';

export const appPipes: PipeTransform<any, any>[] = [
  new ValidationPipe({
    stopAtFirstError: true,
    errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
  }),
];
