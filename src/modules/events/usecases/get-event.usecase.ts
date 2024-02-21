import { Inject, Injectable } from '@nestjs/common';
import { IGetEventUseCase } from './interfaces/get-event.usecase.interface';
import {
  IEventsService,
  IEventsServiceName,
} from '../services/interfaces/events.service.interface';
import { EventDto } from '../dtos/events.dto';

@Injectable()
export class GetEventUseCase implements IGetEventUseCase {
  constructor(
    @Inject(IEventsServiceName)
    private readonly eventService: IEventsService,
  ) {}

  async execute(id: string): Promise<EventDto> {
    return this.eventService.getEvent(id);
  }
}
