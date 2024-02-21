import { CreateEventsDto } from 'src/modules/events/dtos';
import {
  eventsService,
  mockRespository,
  setupModule,
} from './__mocks__/events.service.mock.module';

describe('Event service', () => {
  beforeAll(async () => {
    await setupModule();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('when create an event', () => {
    let result;
    const serviceMockResult = {
      id: 'abcd',
      title: 'Teste 3 2002 - Globalfy',
      startDate: '2024-03-29T00:00:00.000Z',
      endDate: '2024-03-30T00:00:00.000Z',
    };
    const requestMock = {
      title: 'Teste 3 2002 - Globalfy',
      startDate: '2024-03-29T00:00:00.000Z',
      endDate: '2024-03-30T00:00:00.000Z',
    } as unknown as CreateEventsDto;

    beforeEach(async () => {
      mockRespository.save.mockResolvedValueOnce(serviceMockResult);
      result = await eventsService.createEvents(requestMock);
    });

    it('returns the result of create event service', () => {
      expect(result).toBe(serviceMockResult);
    });

    it('calls create an event service with request data', () => {
      expect(mockRespository.save).toHaveBeenCalledWith(requestMock);
    });
  });

  describe('when update an event', () => {
    const serviceMockResult = {
      id: 'abcd',
      title: 'Teste 3 2002 - Globalfy',
      startDate: '2024-03-29T00:00:00.000Z',
      endDate: '2024-03-30T00:00:00.000Z',
    };
    const requestMock = {
      title: 'Teste 3 2002 - Globalfy',
    } as unknown as CreateEventsDto;

    beforeEach(async () => {
      mockRespository.findOne.mockResolvedValueOnce(serviceMockResult);
      mockRespository.update.mockResolvedValue;
      await eventsService.updateEvents('abcd', requestMock);
    });

    it('returns the result of a updated event service', () => {
      expect(mockRespository.update).toHaveBeenCalledWith('abcd', requestMock);
    });
  });

  describe('when delete an event', () => {
    beforeEach(async () => {
      mockRespository.delete.mockResolvedValue;
      await eventsService.deleteEvents('abcd');
    });

    it('returns nothing', () => {
      expect(mockRespository.delete).toHaveBeenCalledWith('abcd');
    });
  });

  describe('when get an event', () => {
    let result;
    const serviceMockResult = {
      id: 'abcd',
      title: 'Teste 3 2002 - Globalfy',
      startDate: '2024-03-29T00:00:00.000Z',
      endDate: '2024-03-30T00:00:00.000Z',
    };

    beforeEach(async () => {
      mockRespository.findOne.mockResolvedValueOnce(serviceMockResult);
      result = await eventsService.getEvent('abcd');
    });

    it('returns the result of get an event service', () => {
      expect(result).toBe(serviceMockResult);
    });

    it('calls create an event service with request data', () => {
      expect(mockRespository.findOne).toHaveBeenCalledWith({
        where: { id: 'abcd' },
      });
    });
  });

  describe('when get all events', () => {
    let result;
    const serviceMockResult = {
      id: 'abcd',
      title: 'Teste 3 2002 - Globalfy',
      startDate: '2024-03-29T00:00:00.000Z',
      endDate: '2024-03-30T00:00:00.000Z',
    };

    const serviceResult = {
      total: 1,
      lastPage: 1,
      currentPage: 1,
      currentPerPage: 1,
      items: [
        {
          id: 'abcd',
          title: 'Teste 3 2002 - Globalfy',
          startDate: '2024-03-29T00:00:00.000Z',
          endDate: '2024-03-30T00:00:00.000Z',
        },
      ],
    };

    beforeEach(async () => {
      mockRespository.count.mockResolvedValueOnce(1);
      mockRespository.find.mockResolvedValueOnce([serviceMockResult]);
      result = await eventsService.getEvents({
        perPage: 1,
        page: 1,
        filters: {},
      });
    });

    it('returns the result of get an event service', () => {
      expect(result).toEqual(serviceResult);
    });

    it('calls count events service with request data', () => {
      expect(mockRespository.count).toHaveBeenCalled();
    });

    it('calls find events service with request data', () => {
      expect(mockRespository.find).toHaveBeenCalled();
    });
  });
});
