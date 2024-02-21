import { Provider } from '@nestjs/common';
import { IGetEventsUseCaseName } from './usecases/interfaces';
import { GetEventsUseCase } from './usecases/get-events.usecase';
import { IEventsServiceName } from './services/interfaces/events.service.interface';
import { EventsService } from './services/events.service';
import { ICreateEventsUseCaseName } from './usecases/interfaces/create-events.usecase.interface';
import { CreateEventsUseCase } from './usecases/create-events.usecase';
import { IUpdateEventsUseCaseName } from './usecases/interfaces/update-events.usecase.interface';
import { UpdateEventsUseCase } from './usecases/update-events.usecase';
import { IDeleteEventsUseCaseName } from './usecases/interfaces/delete-events.usecase.interface';
import { DeleteEventsUseCase } from './usecases/delete-events.usecase';
import { IGetEventUseCaseName } from './usecases/interfaces/get-event.usecase.interface';
import { GetEventUseCase } from './usecases/get-event.usecase';

const services: Provider<any>[] = [
  {
    provide: IEventsServiceName,
    useClass: EventsService,
  },
];

const useCases: Provider<any>[] = [
  {
    provide: IGetEventsUseCaseName,
    useClass: GetEventsUseCase,
  },
  {
    provide: ICreateEventsUseCaseName,
    useClass: CreateEventsUseCase,
  },
  {
    provide: IUpdateEventsUseCaseName,
    useClass: UpdateEventsUseCase,
  },
  {
    provide: IDeleteEventsUseCaseName,
    useClass: DeleteEventsUseCase,
  },
  {
    provide: IGetEventUseCaseName,
    useClass: GetEventUseCase,
  },
];

export const eventsProviders: Provider<any>[] = [...services, ...useCases];
