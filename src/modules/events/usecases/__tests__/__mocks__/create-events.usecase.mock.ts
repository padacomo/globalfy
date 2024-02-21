import { CreateEventsRequest } from '../../../controllers/contracts';

export const serviceMockResult = {
  id: 'abc-123',
  title: 'mock title',
  startDate: '2024-03-29T00:00:00.000Z',
  endDate: '2024-03-30T00:00:00.000Z',
};
export const requestMock = {
  title: 'mock title',
  startDate: '2024-03-29T00:00:00.000Z',
  endDate: '2024-03-30T00:00:00.000Z',
} as unknown as CreateEventsRequest;
