import { Test } from '@nestjs/testing';
import { IGetEventUseCase } from '../../interfaces/get-event.usecase.interface';
import { ConfigModule } from '@nestjs/config';
import { GetEventUseCase } from '../../get-event.usecase';
import { IEventsServiceName } from '../../../services/interfaces/events.service.interface';

export let getEventUseCase: IGetEventUseCase;

export const getEventServiceMock = {
  getEvent: jest.fn(),
};

export const setupModule = async () => {
  const app = await Test.createTestingModule({
    imports: [ConfigModule.forRoot()],
    providers: [
      GetEventUseCase,
      {
        provide: IEventsServiceName,
        useValue: getEventServiceMock,
      },
    ],
  }).compile();

  getEventUseCase = app.get<IGetEventUseCase>(GetEventUseCase);
};
