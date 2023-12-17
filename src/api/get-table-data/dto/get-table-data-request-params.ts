import { SortOrder } from '../../../types/SortOrder';

export interface GetTableDataRequestParams {
  userId: string;
  hasSexColumn?: string;
  hasOpenPageColumn?: string;
  currentPage?: string;
  sortDirectionSexColumn?: SortOrder;
}
