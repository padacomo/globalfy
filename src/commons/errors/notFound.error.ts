import { HttpException, HttpStatus } from '@nestjs/common';

export class ResourceNotFoundError extends HttpException {
  constructor(message: string, status: HttpStatus = HttpStatus.NOT_FOUND) {
    super(message, status);
  }
}
