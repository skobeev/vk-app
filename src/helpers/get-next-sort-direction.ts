import { SortOrder } from '../types/SortOrder';

export const getNextSortDirection = (prevSortDirection: string) => {
  switch (prevSortDirection) {
    case '':
      return SortOrder.Asc;
    case SortOrder.Asc:
      return SortOrder.Desc;
    case SortOrder.Desc:
      return SortOrder.Asc;
    default:
      return '';
  }
};
