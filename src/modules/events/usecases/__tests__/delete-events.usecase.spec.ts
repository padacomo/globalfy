import {
  deleteEventsServiceMock,
  deleteEventsUseCase,
  setupModule,
} from './__mocks__/delete-events.usecase.mock.module';

describe('delete events use case', () => {
  beforeAll(async () => {
    await setupModule();
  });

  describe('when executing the use case', () => {
    beforeEach(async () => {
      deleteEventsServiceMock.deleteEvents.mockResolvedValue;
      await deleteEventsUseCase.execute('abc');
    });

    it('calls events service with request data', () => {
      expect(deleteEventsServiceMock.deleteEvents).toHaveBeenCalledWith('abc');
    });
  });
});
