import { Test } from '@nestjs/testing';
import { ICreateEventsUseCase } from '../../interfaces/create-events.usecase.interface';
import { ConfigModule } from '@nestjs/config';
import { CreateEventsUseCase } from '../../create-events.usecase';
import { IEventsServiceName } from '../../../services/interfaces/events.service.interface';

export let createEventsUseCase: ICreateEventsUseCase;

export const createEventsServiceMock = {
  createEvents: jest.fn(),
};

export const setupModule = async () => {
  const app = await Test.createTestingModule({
    imports: [ConfigModule.forRoot()],
    providers: [
      CreateEventsUseCase,
      {
        provide: IEventsServiceName,
        useValue: createEventsServiceMock,
      },
    ],
  }).compile();

  createEventsUseCase = app.get<ICreateEventsUseCase>(CreateEventsUseCase);
};
