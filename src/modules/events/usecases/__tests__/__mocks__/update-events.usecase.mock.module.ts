import { Test } from '@nestjs/testing';
import { IUpdateEventsUseCase } from '../../interfaces/update-events.usecase.interface';
import { ConfigModule } from '@nestjs/config';
import { UpdateEventsUseCase } from '../../update-events.usecase';
import { IEventsServiceName } from '../../../services/interfaces/events.service.interface';

export let updateEventsUseCase: IUpdateEventsUseCase;

export const updateEventsServiceMock = {
  updateEvents: jest.fn(),
};

export const setupModule = async () => {
  const app = await Test.createTestingModule({
    imports: [ConfigModule.forRoot()],
    providers: [
      UpdateEventsUseCase,
      {
        provide: IEventsServiceName,
        useValue: updateEventsServiceMock,
      },
    ],
  }).compile();

  updateEventsUseCase = app.get<IUpdateEventsUseCase>(UpdateEventsUseCase);
};
