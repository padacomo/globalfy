import { IsOptional, IsString } from '@nestjs/class-validator';
import { UpdateEventsDto } from '../../dtos/update-events.dto';
import { IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateEventsRequest implements UpdateEventsDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'Event Title', description: 'Title of the event' })
  title: string;

  @IsOptional()
  @IsDateString()
  @ApiProperty({
    example: '2024-02-20T12:00:00Z',
    description: 'Start date of the event in ISO format',
  })
  startDate: Date;

  @IsOptional()
  @IsDateString()
  @ApiProperty({
    example: '2024-02-21T14:00:00Z',
    description: 'End date of the event in ISO format',
  })
  endDate: Date;
}
