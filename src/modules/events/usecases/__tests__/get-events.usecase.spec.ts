import { mockRequest, mockResult } from './__mocks__/get-events.usecase.mock';
import {
  getEventsServiceMock,
  getEventsUseCase,
  setupModule,
} from './__mocks__/get-events.usecase.mock.module';

describe('get events use case', () => {
  beforeAll(async () => {
    await setupModule();
  });

  describe('when executing the use case', () => {
    let result;

    beforeEach(async () => {
      getEventsServiceMock.getEvents.mockResolvedValueOnce(mockResult);
      result = await getEventsUseCase.execute(mockRequest);
    });

    it('returns the result of slip service', () => {
      expect(result).toBe(mockResult);
    });

    it('calls events service with request data', () => {
      expect(getEventsServiceMock.getEvents).toHaveBeenCalledWith(mockRequest);
    });
  });
});
