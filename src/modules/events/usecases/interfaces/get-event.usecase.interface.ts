import { EventDto } from '../../dtos/events.dto';

export interface IGetEventUseCase {
  execute(id: string): Promise<EventDto>;
}

export const IGetEventUseCaseName = 'IGetEventUseCase';
