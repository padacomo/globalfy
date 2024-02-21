import { Inject, Injectable } from '@nestjs/common';

import { ICreateEventsUseCase } from './interfaces/create-events.usecase.interface';
import { CreateEventsDto } from '../dtos';
import {
  IEventsService,
  IEventsServiceName,
} from '../services/interfaces/events.service.interface';
import { ConflictEventDto } from '../dtos/conflic-events.dto';

@Injectable()
export class CreateEventsUseCase implements ICreateEventsUseCase {
  constructor(
    @Inject(IEventsServiceName)
    private readonly eventService: IEventsService,
  ) {}

  async execute(data: CreateEventsDto): Promise<ConflictEventDto> {
    return this.eventService.createEvents(data);
  }
}
