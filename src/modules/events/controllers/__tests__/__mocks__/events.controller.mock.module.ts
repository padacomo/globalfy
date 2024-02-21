import { Test } from '@nestjs/testing';
import { EventsController } from '../../events.controller';
import { IGetEventUseCaseName } from '../../../usecases/interfaces/get-event.usecase.interface';
import { IGetEventsUseCaseName } from '../../../usecases/interfaces';
import { ICreateEventsUseCaseName } from '../../../usecases/interfaces/create-events.usecase.interface';
import { IDeleteEventsUseCaseName } from '../../../usecases/interfaces/delete-events.usecase.interface';
import { IUpdateEventsUseCaseName } from '../../../usecases/interfaces/update-events.usecase.interface';

export const createEventsUseCaseMock = {
  execute: jest.fn(),
};
export const getEventUseCaseMock = {
  execute: jest.fn(),
};
export const getEventsUseCaseMock = {
  execute: jest.fn(),
};
export const deleteEventsUseCaseMock = {
  execute: jest.fn(),
};
export const updateEventsUseCaseMock = {
  execute: jest.fn(),
};

export let eventsController: EventsController;

export const setupModule = async () => {
  const app = await Test.createTestingModule({
    providers: [
      EventsController,
      {
        provide: ICreateEventsUseCaseName,
        useValue: createEventsUseCaseMock,
      },
      {
        provide: IGetEventUseCaseName,
        useValue: getEventUseCaseMock,
      },
      {
        provide: IGetEventsUseCaseName,
        useValue: getEventsUseCaseMock,
      },
      {
        provide: IDeleteEventsUseCaseName,
        useValue: deleteEventsUseCaseMock,
      },
      {
        provide: IUpdateEventsUseCaseName,
        useValue: updateEventsUseCaseMock,
      },
    ],
  }).compile();

  eventsController = app.get<EventsController>(EventsController);
};
