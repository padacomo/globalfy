import { ISkipAndTake } from './pagination.interface';

export function calculatePagination(
  page: number,
  perPage: number,
): ISkipAndTake {
  return {
    skip: page === 1 ? 0 : page * perPage - perPage,
    take: perPage,
  };
}
