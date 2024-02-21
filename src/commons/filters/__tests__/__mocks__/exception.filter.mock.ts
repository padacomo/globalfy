import { getMockRes } from '@jest-mock/express';
import { ArgumentsHost, HttpStatus } from '@nestjs/common';
import { DefaultError } from '../../../errors';

const { res: mockResponse } = getMockRes();
export { mockResponse };

export const mockHttpArgumentsHost = jest.fn().mockImplementation(() => ({
  getResponse: () => mockResponse,
  getRequest: jest.fn(),
}));

export const mockArgumentsHost = {
  switchToHttp: mockHttpArgumentsHost,
} as unknown as ArgumentsHost;

export class MockException extends DefaultError {
  constructor() {
    super('mock error message', HttpStatus.BAD_REQUEST);
  }
}
