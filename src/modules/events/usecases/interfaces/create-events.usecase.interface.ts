import { CreateEventsDto } from '../../dtos';
import { ConflictEventDto } from '../../dtos/conflic-events.dto';

export interface ICreateEventsUseCase {
  execute(data: CreateEventsDto): Promise<ConflictEventDto>;
}

export const ICreateEventsUseCaseName = 'ICreateEventsUseCase';
