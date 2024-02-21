import { HttpException, HttpStatus } from '@nestjs/common';

export class DefaultError extends HttpException {
  constructor(
    message: string,
    status: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR,
  ) {
    super(message, status);
  }
}
