import { PaginationResponseType } from 'src/commons/pagination';
import { IGetEventsRequest } from '../../controllers/contracts';
import { EventDto } from '../../dtos/events.dto';

export interface IGetEventsUseCase {
  execute(params: IGetEventsRequest): Promise<PaginationResponseType<EventDto>>;
}

export const IGetEventsUseCaseName = 'IGetEventsUseCase';
