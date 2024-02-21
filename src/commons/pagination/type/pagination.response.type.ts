export type PaginationResponseType<T> = {
  total: number;
  lastPage: number;
  currentPage: number;
  currentPerPage: number;
  items: T[];
};
