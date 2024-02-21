import { format, isAfter, isEqual } from 'date-fns';

const DEFAULT_DATE_FORMAT = 'yyyy-MM-dd';

export const formatDate = (date: Date, dateFormat = DEFAULT_DATE_FORMAT) =>
  format(date, dateFormat);

export const dateIsEqual = (firstDate: Date, secondDate: Date) =>
  isEqual(firstDate, secondDate);

export const isAfterSecondOne = (firstDate: Date, secondeDate: Date) =>
  isAfter(firstDate, secondeDate);
