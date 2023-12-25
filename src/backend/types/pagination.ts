import { PaginationButtons } from './pagination-butons';

export interface Pagination {
  currentPage: number;
  pageSize: number;
  totalPages: number;
  paginationButtons: PaginationButtons;
}
