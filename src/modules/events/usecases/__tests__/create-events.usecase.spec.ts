import {
  requestMock,
  serviceMockResult,
} from './__mocks__/create-events.usecase.mock';
import {
  createEventsServiceMock,
  createEventsUseCase,
  setupModule,
} from './__mocks__/create-events.usecase.mock.module';

describe('create events use case', () => {
  beforeAll(async () => {
    await setupModule();
  });

  describe('when executing the use case', () => {
    let result;

    beforeEach(async () => {
      createEventsServiceMock.createEvents.mockResolvedValueOnce(
        serviceMockResult,
      );
      result = await createEventsUseCase.execute(requestMock);
    });

    it('returns the result of slip service', () => {
      expect(result).toBe(serviceMockResult);
    });

    it('calls events service with request data', () => {
      expect(createEventsServiceMock.createEvents).toHaveBeenCalledWith(
        requestMock,
      );
    });
  });
});
