import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import {
  FORBIDDEN_MESSAGE,
  UNAUTHORIZED_MESSAGE,
} from '../exception.constants';
import { AppExceptionFilter } from '../exception.filter';
import {
  mockArgumentsHost,
  MockException,
  mockResponse,
} from './__mocks__/exception.filter.mock';

const exceptionFilter = new AppExceptionFilter();
describe('AppExceptionFilter | UnitTest', () => {
  describe.each([
    {
      errorType: 'DefaultError',
      error: new MockException(),
      expectedStatus: HttpStatus.BAD_REQUEST,
      expectedMessage: 'mock error message',
    },
    {
      errorType: 'UnprocessableEntityException',
      error: new UnprocessableEntityException({
        message: ['mock validation error'],
      }),
      expectedStatus: HttpStatus.UNPROCESSABLE_ENTITY,
      expectedMessage: 'mock validation error',
    },
    {
      errorType: 'UnauthorizedException',
      error: new UnauthorizedException(),
      expectedStatus: HttpStatus.UNAUTHORIZED,
      expectedMessage: UNAUTHORIZED_MESSAGE,
    },
    {
      errorType: 'ForbiddenException',
      error: new ForbiddenException(),
      expectedStatus: HttpStatus.FORBIDDEN,
      expectedMessage: FORBIDDEN_MESSAGE,
    },
    {
      errorType: 'Error',
      error: new Error('unmapped error'),
      expectedStatus: HttpStatus.INTERNAL_SERVER_ERROR,
      expectedMessage: 'unmapped error',
    },
  ])(
    'when error is $errorType',
    ({ error, expectedStatus, expectedMessage }) => {
      beforeEach(() => {
        exceptionFilter.catch(error, mockArgumentsHost);
      });

      it(`returns http status ${expectedStatus}`, () => {
        expect(mockResponse.status).toHaveBeenCalledWith(expectedStatus);
      });

      it(`returns message '${expectedMessage}'`, () => {
        expect(mockResponse.json).toHaveBeenCalledWith({
          message: expectedMessage,
        });
      });
    },
  );
});
