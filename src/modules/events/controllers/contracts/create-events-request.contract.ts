import {
  IsDateString,
  IsDefined,
  IsNotEmpty,
  IsString,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';
import { CreateEventsDto } from '../../dtos';
import { IsEndDateGreaterThanStartDateConstraint } from './validate-dates.contract';
import { ApiProperty } from '@nestjs/swagger';

export function IsEndDateGreaterThanStartDate(
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsEndDateGreaterThanStartDateConstraint,
    });
  };
}

export class CreateEventsRequest implements CreateEventsDto {
  @IsString()
  @IsDefined({ message: 'title is required' })
  @IsNotEmpty({ message: 'title cannot be an empty field' })
  @ApiProperty({ example: 'Event Title', description: 'Title of the event' })
  title: string;

  @IsDateString()
  @IsDefined({ message: 'startDate is required' })
  @IsNotEmpty({ message: 'startDate cannot be an empty field' })
  @ApiProperty({
    example: '2024-02-20T12:00:00Z',
    description: 'Start date of the event in ISO format',
  })
  startDate: Date;

  @IsDateString()
  @IsDefined({ message: 'endDate is required' })
  @IsNotEmpty({ message: 'endDate cannot be an empty field' })
  @IsEndDateGreaterThanStartDate({
    message: 'endDate must be greater than startDate',
  })
  @ApiProperty({
    example: '2024-02-21T14:00:00Z',
    description: 'End date of the event in ISO format',
  })
  endDate: Date;
}
