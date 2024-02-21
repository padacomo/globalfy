import {
  requestMock,
  serviceMockResult,
} from './__mocks__/update-events.usecase.mock';
import {
  setupModule,
  updateEventsServiceMock,
  updateEventsUseCase,
} from './__mocks__/update-events.usecase.mock.module';

describe('update events use case', () => {
  beforeAll(async () => {
    await setupModule();
  });

  describe('when executing the use case', () => {
    let result;

    beforeEach(async () => {
      updateEventsServiceMock.updateEvents.mockResolvedValueOnce(
        serviceMockResult,
      );
      result = await updateEventsUseCase.execute('abc', requestMock);
    });

    it('returns the result of slip service', () => {
      expect(result).toBe(serviceMockResult);
    });

    it('calls events service with request data', () => {
      expect(updateEventsServiceMock.updateEvents).toHaveBeenCalledWith(
        'abc',
        requestMock,
      );
    });
  });
});
