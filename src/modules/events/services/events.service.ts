import { Injectable } from '@nestjs/common';
import { IEventsService } from './interfaces/events.service.interface';
import { CreateEventsDto } from '../dtos';
import { EventDto } from '../dtos/events.dto';
import { UpdateEventsDto } from '../dtos/update-events.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Between,
  LessThanOrEqual,
  MoreThanOrEqual,
  Not,
  Repository,
} from 'typeorm';
import { Events } from '../entities';
import { DefaultError, ResourceNotFoundError } from '../../../commons/errors';
import { ConflictEventDto } from '../dtos/conflic-events.dto';
import { isAfterSecondOne } from '../../../commons/utils';
import { IGetEventsRequest } from '../controllers/contracts';
import {
  PaginationResponseType,
  calculatePagination,
} from '../../../commons/pagination';

@Injectable()
export class EventsService implements IEventsService {
  constructor(
    @InjectRepository(Events, process.env.DB_NAME)
    private readonly eventRepository: Repository<Events>,
  ) {}

  private async findEventById(id: string): Promise<EventDto> {
    return this.eventRepository.findOne({ where: { id } });
  }

  private async checkEventExists(id: string): Promise<EventDto> {
    try {
      const event = await this.findEventById(id);
      return event;
    } catch (error) {
      throw new ResourceNotFoundError('Event not found');
    }
  }

  private checkSecondDate(currentStartDate: Date, secondDate: Date): void {
    const checkedDateconditions = isAfterSecondOne(
      currentStartDate,
      secondDate,
    );
    if (checkedDateconditions) {
      throw new DefaultError('endDate must be greater than startDate');
    }
  }

  private assemblerEventsFilters(filters: { date?: string; title?: string }) {
    const objectFilters: any = {};
    if (filters?.date) {
      objectFilters.startDate = LessThanOrEqual(filters.date);
      objectFilters.endDate = MoreThanOrEqual(filters.date);
    }
    delete filters.date;
    return { ...filters, ...objectFilters };
  }

  private async isConlictEvent(
    id: string,
    startDate: Date,
    endDate: Date,
  ): Promise<boolean> {
    const conflictingEvents = await this.eventRepository.find({
      where: [
        { id: Not(id), startDate: Between(startDate, endDate) },
        { id: Not(id), endDate: Between(startDate, endDate) },
      ],
    });
    return conflictingEvents.length > 0;
  }

  async getEvents(
    params: IGetEventsRequest,
  ): Promise<PaginationResponseType<EventDto>> {
    const page = Number(params.page) || 1;
    const perPage = Number(params.perPage) || 10;
    const options = calculatePagination(page, perPage);

    const objectFilters = params?.filters
      ? this.assemblerEventsFilters(params?.filters)
      : {};

    const total = await this.eventRepository.count({
      where: objectFilters,
    });
    const items = await this.eventRepository.find({
      ...options,
      where: objectFilters,
    });

    return {
      total,
      lastPage: Math.ceil(total / perPage),
      currentPage: page,
      currentPerPage: perPage,
      items,
    };
  }

  async getEvent(id: string): Promise<EventDto> {
    return this.checkEventExists(id);
  }

  async createEvents(data: CreateEventsDto): Promise<ConflictEventDto> {
    const event = await this.eventRepository.findOne({
      where: { ...data },
    });

    if (event) {
      const isConflicting = await this.isConlictEvent(
        event.id,
        event.startDate,
        event.endDate,
      );
      return { ...event, isConflicting };
    }

    const newEvent = await this.eventRepository.save(data);
    const isConflicting = await this.isConlictEvent(
      newEvent.id,
      newEvent.startDate,
      newEvent.endDate,
    );
    return { ...newEvent, isConflicting };
  }

  async updateEvents(
    id: string,
    data: UpdateEventsDto,
  ): Promise<ConflictEventDto> {
    const event = await this.checkEventExists(id);

    if (!data.startDate && data.endDate) {
      this.checkSecondDate(event.startDate, data.endDate);
    }

    await this.eventRepository.update(id, data);
    const updatedEvent = await this.findEventById(id);
    const isConflicting = await this.isConlictEvent(
      updatedEvent.id,
      updatedEvent.startDate,
      updatedEvent.endDate,
    );
    return { ...updatedEvent, isConflicting };
  }

  async deleteEvents(id: string): Promise<void> {
    await this.eventRepository.delete(id);
  }
}
