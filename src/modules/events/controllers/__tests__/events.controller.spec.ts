import { getMockRes } from '@jest-mock/express';
import {
  createEventsUseCaseMock,
  deleteEventsUseCaseMock,
  eventsController,
  getEventUseCaseMock,
  getEventsUseCaseMock,
  setupModule,
  updateEventsUseCaseMock,
} from './__mocks__/events.controller.mock.module';
import { CreateEventsRequest } from '../contracts';
import { mockResult } from '../../usecases/__tests__/__mocks__/get-events.usecase.mock';

describe('Events Controller', () => {
  const { res: responseMock } = getMockRes();

  beforeAll(async () => {
    await setupModule();
  });

  describe('when creating a event', () => {
    const mockResult = {
      id: 'abcd',
      title: 'Teste 3 2002 - Globalfy',
      startDate: '2024-03-29T00:00:00.000Z',
      endDate: '2024-03-30T00:00:00.000Z',
    };
    const mockRequest = {
      title: 'Teste 3 2002 - Globalfy',
      startDate: '2024-03-29T00:00:00.000Z',
      endDate: '2024-03-30T00:00:00.000Z',
    };
    beforeEach(async () => {
      createEventsUseCaseMock.execute.mockReturnValue(mockResult);

      await eventsController.createEvents(
        mockRequest as unknown as CreateEventsRequest,
        responseMock,
      );
    });

    it('executes the use case', () => {
      expect(createEventsUseCaseMock.execute).toHaveBeenCalledWith(mockRequest);
    });

    it('returns a created event', () => {
      expect(responseMock.send).toHaveBeenCalled();
    });
  });

  describe('when update a event', () => {
    const mockResult = {
      id: 'abcd',
      title: 'Teste 3 2002 - Globalfy',
      startDate: '2024-03-29T00:00:00.000Z',
      endDate: '2024-03-30T00:00:00.000Z',
    };
    const mockRequest = {
      title: 'Teste 3 2002 - Globalfy',
    };
    beforeEach(async () => {
      updateEventsUseCaseMock.execute.mockReturnValue(mockResult);

      await eventsController.updateEvents(
        'abcd',
        mockRequest as unknown as CreateEventsRequest,
        responseMock,
      );
    });

    it('executes the use case', () => {
      expect(createEventsUseCaseMock.execute).toHaveBeenCalled();
    });

    it('returns a created event', () => {
      expect(responseMock.send).toHaveBeenCalled();
    });
  });

  describe('when get all events', () => {
    const mockRequest = {
      page: 1,
      perPage: 2,
    };
    beforeEach(async () => {
      getEventsUseCaseMock.execute.mockReturnValue(mockResult);

      await eventsController.getEvents(mockRequest, responseMock);
    });

    it('executes the use case', () => {
      expect(getEventsUseCaseMock.execute).toHaveBeenCalled();
    });

    it('returns an event list', () => {
      expect(responseMock.send).toHaveBeenCalled();
    });
  });

  describe('when get an event', () => {
    beforeEach(async () => {
      getEventUseCaseMock.execute.mockReturnValue(mockResult);

      await eventsController.getEvent('abcd', responseMock);
    });

    it('executes the use case', () => {
      expect(getEventUseCaseMock.execute).toHaveBeenCalled();
    });

    it('returns an event', () => {
      expect(responseMock.send).toHaveBeenCalled();
    });
  });

  describe('when delete an event', () => {
    beforeEach(async () => {
      deleteEventsUseCaseMock.execute.mockResolvedValue;
      await eventsController.deleteEvents('abcd', responseMock);
    });

    it('executes the use case', () => {
      expect(deleteEventsUseCaseMock.execute).toHaveBeenCalled();
    });
  });
});
