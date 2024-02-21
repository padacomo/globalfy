import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { Filters } from './filter-events.request.contract';

export class IGetEventsRequest {
  @ApiProperty()
  @IsOptional()
  page?: number;

  @ApiProperty()
  @IsOptional()
  perPage?: number;

  @ApiProperty()
  @IsOptional()
  @Type(() => Filters)
  filters?: any;
}
