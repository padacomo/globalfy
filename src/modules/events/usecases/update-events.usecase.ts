import { Inject, Injectable } from '@nestjs/common';
import { IUpdateEventsUseCase } from './interfaces/update-events.usecase.interface';
import {
  IEventsService,
  IEventsServiceName,
} from '../services/interfaces/events.service.interface';
import { UpdateEventsDto } from '../dtos/update-events.dto';
import { ConflictEventDto } from '../dtos/conflic-events.dto';

@Injectable()
export class UpdateEventsUseCase implements IUpdateEventsUseCase {
  constructor(
    @Inject(IEventsServiceName)
    private readonly eventService: IEventsService,
  ) {}

  async execute(id: string, data: UpdateEventsDto): Promise<ConflictEventDto> {
    return this.eventService.updateEvents(id, data);
  }
}
