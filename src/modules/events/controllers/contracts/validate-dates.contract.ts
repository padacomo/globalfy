import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { CreateEventsRequest } from './create-events-request.contract';

@ValidatorConstraint({ async: true })
export class IsEndDateGreaterThanStartDateConstraint
  implements ValidatorConstraintInterface
{
  async validate(value: Date, args: ValidationArguments) {
    const startDate = (args.object as CreateEventsRequest).startDate;
    return value > startDate;
  }

  defaultMessage() {
    return 'endDate must be greater than startDate';
  }
}
