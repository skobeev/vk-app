import { SortOrder } from '../../types/SortOrder';

export interface SortState {
  sortDirectionNameColumn: SortOrder | '';
  sortDirectionLastNameColumn: SortOrder | '';
  sortDirectionSexColumn: SortOrder | '';
  sortDirectionPageOpenColumn: SortOrder | '';
}
