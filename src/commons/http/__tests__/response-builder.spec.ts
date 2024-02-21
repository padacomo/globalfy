import { getMockRes } from '@jest-mock/express';
import { HttpStatus } from '@nestjs/common';
import {
  createdResponse,
  emptyOrSuccessResponse,
  emptyResponse,
  successResponse,
  successSendResponse,
} from '../response-builder';

const { res: response } = getMockRes();

const mockResult = {
  id: 'abc-123',
  name: 'mocked name',
};

describe('ResponseBuilder | UnitTest', () => {
  describe('when building successful response', () => {
    beforeEach(() => successResponse(response, mockResult));

    it('returns http status 200', () => {
      expect(response.status).toHaveBeenCalledWith(HttpStatus.OK);
    });

    it('returns sends result as json', () => {
      expect(response.json).toHaveBeenCalledWith(mockResult);
    });
  });

  describe('when building no content response', () => {
    beforeEach(() => emptyResponse(response));

    it('returns http status 204', () => {
      expect(response.status).toHaveBeenCalledWith(HttpStatus.NO_CONTENT);
    });
  });

  describe('when building created response', () => {
    beforeEach(() => createdResponse(response));

    it('returns http status 201', () => {
      expect(response.status).toHaveBeenCalledWith(HttpStatus.CREATED);
    });
  });

  describe('when building empty or success response', () => {
    describe('and the response is empty', () => {
      beforeEach(() => emptyOrSuccessResponse(response, null));

      it('returns http status 204', () => {
        expect(response.status).toHaveBeenCalledWith(HttpStatus.NO_CONTENT);
      });
    });

    describe('and the response is not empty', () => {
      beforeEach(() => emptyOrSuccessResponse(response, mockResult));

      it('returns http status 200', () => {
        expect(response.status).toHaveBeenCalledWith(HttpStatus.OK);
      });

      it('returns sends result as json', () => {
        expect(response.json).toHaveBeenCalledWith(mockResult);
      });
    });

    describe('and the response is success', () => {
      beforeEach(() => successSendResponse(response));

      it('returns http status 200', () => {
        expect(response.status).toHaveBeenCalledWith(HttpStatus.OK);
      });
    });
  });
});
