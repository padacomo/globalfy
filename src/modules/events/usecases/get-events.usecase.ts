import { Inject, Injectable } from '@nestjs/common';
import { IGetEventsUseCase } from './interfaces';
import {
  IEventsService,
  IEventsServiceName,
} from '../services/interfaces/events.service.interface';
import { IGetEventsRequest } from '../controllers/contracts';
import { PaginationResponseType } from 'src/commons/pagination';
import { EventDto } from '../dtos/events.dto';

@Injectable()
export class GetEventsUseCase implements IGetEventsUseCase {
  constructor(
    @Inject(IEventsServiceName)
    private readonly eventService: IEventsService,
  ) {}

  async execute(
    params: IGetEventsRequest,
  ): Promise<PaginationResponseType<EventDto>> {
    return this.eventService.getEvents(params);
  }
}
