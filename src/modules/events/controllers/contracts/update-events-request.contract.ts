import { UpdateEventsDto } from '../../dtos/update-events.dto';
import {
  IsDateString,
  IsOptional,
  IsString,
  Validate,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@ValidatorConstraint({ name: 'customDateRange', async: false })
export class CustomDateRangeValidator implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const startDate = args.object['startDate'];

    if (value && startDate && value < startDate) {
      return false;
    }

    return true;
  }

  defaultMessage() {
    return 'End date cannot be earlier than start date';
  }
}
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
    description: 'endDate of the event in ISO format',
  })
  @Validate(CustomDateRangeValidator)
  endDate: Date;
}
