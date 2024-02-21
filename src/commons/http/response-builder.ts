import { HttpStatus } from '@nestjs/common';
import { Response } from 'express';

export const successResponse = <T>(response: Response, result: T) => {
  response.status(HttpStatus.OK);
  response.json(result);
};

export const successSendResponse = <T>(response: Response) => {
  response.status(HttpStatus.OK);
  response.end();
};

export const emptyResponse = (response: Response) => {
  response.status(HttpStatus.NO_CONTENT);
  response.end();
};

export const createdResponse = (response: Response) => {
  response.status(HttpStatus.CREATED);
  response.end();
};

export const emptyOrSuccessResponse = <T>(response: Response, result: T) => {
  if (result) {
    successResponse(response, result);
    return;
  }

  emptyResponse(response);
};
