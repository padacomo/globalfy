import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  ForbiddenException,
  HttpException,
  HttpStatus,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Response } from 'express';
import { DefaultError, ResourceNotFoundError } from '../errors';
import {
  FORBIDDEN_MESSAGE,
  MESSAGE_FIELD,
  RESOURCE_NOT_FOUND,
  UNAUTHORIZED_MESSAGE,
} from './exception.constants';

interface ErrorResponse {
  status: number;
  message: string;
}

@Catch()
export class AppExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const res = context.getResponse<Response>();

    const errorResponse = this.buildErrorResponse(exception);

    res.status(errorResponse.status);
    res.json({ message: errorResponse.message });
  }

  private buildErrorResponse(exception: Error): ErrorResponse {
    if (exception instanceof DefaultError) {
      return {
        status: exception.getStatus(),
        message: exception.message,
      };
    }

    if (exception instanceof UnprocessableEntityException) {
      return {
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        message: exception.getResponse()[MESSAGE_FIELD][0],
      };
    }

    if (exception instanceof UnauthorizedException) {
      return {
        status: exception.getStatus(),
        message: UNAUTHORIZED_MESSAGE,
      };
    }

    if (exception instanceof ForbiddenException) {
      return {
        status: exception.getStatus(),
        message: FORBIDDEN_MESSAGE,
      };
    }

    if (exception instanceof ResourceNotFoundError) {
      return {
        status: exception.getStatus(),
        message: exception.message || RESOURCE_NOT_FOUND,
      };
    }

    if (exception instanceof HttpException) {
      return {
        status: exception.getStatus(),
        message: exception['response']['message'] || exception.message,
      };
    }
    return {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: exception.message,
    };
  }
}
