import { EventDto } from 'src/modules/events/dtos/events.dto';

export interface ISkipAndTake {
  take: number;
  skip: number;
}

export interface IGetAllEventsRequest {
  page?: number;
  perPage?: number;
  filters?: { [key in keyof EventDto]?: any };
}
