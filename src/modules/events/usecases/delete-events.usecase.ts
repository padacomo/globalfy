import { Inject, Injectable } from '@nestjs/common';
import {
  IEventsService,
  IEventsServiceName,
} from '../services/interfaces/events.service.interface';
import { IDeleteEventsUseCase } from './interfaces/delete-events.usecase.interface';

@Injectable()
export class DeleteEventsUseCase implements IDeleteEventsUseCase {
  constructor(
    @Inject(IEventsServiceName)
    private readonly eventService: IEventsService,
  ) {}

  async execute(id: string): Promise<void> {
    await this.eventService.deleteEvents(id);
  }
}
