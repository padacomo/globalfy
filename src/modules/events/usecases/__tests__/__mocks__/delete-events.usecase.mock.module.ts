import { Test } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { IEventsServiceName } from '../../../services/interfaces/events.service.interface';
import { IDeleteEventsUseCase } from '../../interfaces/delete-events.usecase.interface';
import { DeleteEventsUseCase } from '../../delete-events.usecase';

export let deleteEventsUseCase: IDeleteEventsUseCase;

export const deleteEventsServiceMock = {
  deleteEvents: jest.fn(),
};

export const setupModule = async () => {
  const app = await Test.createTestingModule({
    imports: [ConfigModule.forRoot()],
    providers: [
      DeleteEventsUseCase,
      {
        provide: IEventsServiceName,
        useValue: deleteEventsServiceMock,
      },
    ],
  }).compile();

  deleteEventsUseCase = app.get<IDeleteEventsUseCase>(DeleteEventsUseCase);
};
