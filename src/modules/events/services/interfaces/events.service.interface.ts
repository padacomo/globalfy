import { PaginationResponseType } from 'src/commons/pagination';
import { IGetEventsRequest } from '../../controllers/contracts';
import { CreateEventsDto } from '../../dtos';
import { ConflictEventDto } from '../../dtos/conflic-events.dto';
import { EventDto } from '../../dtos/events.dto';
import { UpdateEventsDto } from '../../dtos/update-events.dto';

export interface IEventsService {
  getEvents(
    params: IGetEventsRequest,
  ): Promise<PaginationResponseType<EventDto>>;
  getEvent(id: string): Promise<EventDto>;
  createEvents(data: CreateEventsDto): Promise<ConflictEventDto>;
  updateEvents(id: string, data: UpdateEventsDto): Promise<ConflictEventDto>;
  deleteEvents(id: string): Promise<void>;
}

export const IEventsServiceName = 'IEventsService';
