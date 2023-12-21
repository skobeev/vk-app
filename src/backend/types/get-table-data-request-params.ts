import { SortOrder } from '../../types/SortOrder';
import { ColumsIds } from '../constants/column-ids';

export interface GetTableDataRequestParams {
  userId: string;
  hasSexColumn?: string;
  hasOpenPageColumn?: string;
  isMan?: string;
  isWoman?: string;
  currentPage?: string;
  sortDirection: SortOrder;
  sortedColumnId: ColumsIds;
}
