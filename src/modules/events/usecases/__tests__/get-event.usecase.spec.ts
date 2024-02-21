import { serviceMockResult } from './__mocks__/get-event.usecase.mock';
import {
  getEventServiceMock,
  getEventUseCase,
  setupModule,
} from './__mocks__/get-event.usecase.mock.module';

describe('get event use case', () => {
  beforeAll(async () => {
    await setupModule();
  });

  describe('when executing the use case', () => {
    let result;

    beforeEach(async () => {
      getEventServiceMock.getEvent.mockResolvedValueOnce(serviceMockResult);
      result = await getEventUseCase.execute('abc');
    });

    it('returns the result of slip service', () => {
      expect(result).toBe(serviceMockResult);
    });

    it('calls events service with request data', () => {
      expect(getEventServiceMock.getEvent).toHaveBeenCalledWith('abc');
    });
  });
});
