import { DEFAULT_PAGE_SIZE } from '../constants/default-page-size';
import { GetPaginationParams } from '../types/get-pagination-params';
import { Pagination } from '../types/pagination';
import { getPaginationButtons } from './get-pagination-buttons';

export const getPagination = (
  params: GetPaginationParams
): Pagination | null => {
  const { currentPage, tableRowsCount } = params;
  const totalPages = Math.ceil(tableRowsCount / DEFAULT_PAGE_SIZE);

  return tableRowsCount <= DEFAULT_PAGE_SIZE
    ? null
    : {
        currentPage,
        pageSize: DEFAULT_PAGE_SIZE,
        totalPages,
        paginationButtons: getPaginationButtons(currentPage, totalPages),
      };
};
