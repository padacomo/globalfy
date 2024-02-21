import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { EVENTS_PATH } from '../constants';
import {
  IGetEventsUseCase,
  IGetEventsUseCaseName,
} from '../usecases/interfaces';
import { ApiTags } from '@nestjs/swagger';
import { CreateEventsRequest, IGetEventsRequest } from './contracts';
import {
  ICreateEventsUseCase,
  ICreateEventsUseCaseName,
} from '../usecases/interfaces/create-events.usecase.interface';
import { UpdateEventsRequest } from './contracts/update-events-request.contract';
import {
  IUpdateEventsUseCase,
  IUpdateEventsUseCaseName,
} from '../usecases/interfaces/update-events.usecase.interface';
import {
  IDeleteEventsUseCase,
  IDeleteEventsUseCaseName,
} from '../usecases/interfaces/delete-events.usecase.interface';
import {
  IGetEventUseCase,
  IGetEventUseCaseName,
} from '../usecases/interfaces/get-event.usecase.interface';
import {
  createdResponse,
  emptyResponse,
  successResponse,
  successSendResponse,
} from '../../../commons/http/response-builder';

@Controller(EVENTS_PATH)
@ApiTags()
export class EventsController {
  constructor(
    @Inject(IGetEventsUseCaseName)
    private readonly getEventsUseCase: IGetEventsUseCase,

    @Inject(IGetEventUseCaseName)
    private readonly getEventUseCase: IGetEventUseCase,

    @Inject(ICreateEventsUseCaseName)
    private readonly createEventsUseCase: ICreateEventsUseCase,

    @Inject(IUpdateEventsUseCaseName)
    private readonly updateEventsUseCase: IUpdateEventsUseCase,

    @Inject(IDeleteEventsUseCaseName)
    private readonly deleteEventsUseCase: IDeleteEventsUseCase,
  ) {}

  @Get('/:id')
  async getEvent(@Param('id') id: string, @Res() response: Response) {
    const event = await this.getEventUseCase.execute(id);
    return successResponse(response, event);
  }

  @Get()
  async getEvents(
    @Query() params: IGetEventsRequest,
    @Res() response: Response,
  ) {
    const events = await this.getEventsUseCase.execute(params);
    response.send(events);
    return successSendResponse(response);
  }

  @Post()
  async createEvents(
    @Body() createEventsRequest: CreateEventsRequest,
    @Res() response: Response,
  ) {
    const event = await this.createEventsUseCase.execute(createEventsRequest);
    response.send(event);
    return createdResponse(response);
  }

  @Put('/:id')
  async updateEvents(
    @Param('id') id: string,
    @Body() updateEventsRequest: UpdateEventsRequest,
    @Res() response: Response,
  ) {
    const event = await this.updateEventsUseCase.execute(
      id,
      updateEventsRequest,
    );
    response.send(event);
    return successResponse(response, event);
  }

  @Delete('/:id')
  async deleteEvents(@Param('id') id: string, @Res() response: Response) {
    await this.deleteEventsUseCase.execute(id);
    return emptyResponse(response);
  }
}
