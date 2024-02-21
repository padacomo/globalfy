import { Test } from '@nestjs/testing';
import { IGetEventsUseCase } from '../../interfaces';
import { ConfigModule } from '@nestjs/config';
import { GetEventsUseCase } from '../../get-events.usecase';
import { IEventsServiceName } from '../../../services/interfaces/events.service.interface';

export let getEventsUseCase: IGetEventsUseCase;

export const getEventsServiceMock = {
  getEvents: jest.fn(),
};

export const setupModule = async () => {
  const app = await Test.createTestingModule({
    imports: [ConfigModule.forRoot()],
    providers: [
      GetEventsUseCase,
      {
        provide: IEventsServiceName,
        useValue: getEventsServiceMock,
      },
    ],
  }).compile();

  getEventsUseCase = app.get<IGetEventsUseCase>(GetEventsUseCase);
};
