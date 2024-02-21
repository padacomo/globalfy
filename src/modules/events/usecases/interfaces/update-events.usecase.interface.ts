import { ConflictEventDto } from '../../dtos/conflic-events.dto';
import { UpdateEventsDto } from '../../dtos/update-events.dto';

export interface IUpdateEventsUseCase {
  execute(id: string, data: UpdateEventsDto): Promise<ConflictEventDto>;
}

export const IUpdateEventsUseCaseName = 'IUpdateEventsUseCase';
