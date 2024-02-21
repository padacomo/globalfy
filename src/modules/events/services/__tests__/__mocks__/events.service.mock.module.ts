import { Test } from '@nestjs/testing';
import { EventsService } from '../../events.service';
import { Repository } from 'typeorm';
import { Events } from '../../../entities/events.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

export let eventsService: EventsService;
export let eventRepository: Repository<Events>;

export const mockRespository = {
  findOne: jest.fn(),
  find: jest.fn(),
  count: jest.fn(),
  save: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};
export const setupModule = async () => {
  const app = await Test.createTestingModule({
    providers: [
      EventsService,
      {
        provide: getRepositoryToken(Events, process.env.DB_NAME),
        useValue: mockRespository,
      },
    ],
  }).compile();

  eventsService = app.get<EventsService>(EventsService);
  eventRepository = app.get<Repository<Events>>(
    getRepositoryToken(Events, process.env.DB_NAME),
  );
};
