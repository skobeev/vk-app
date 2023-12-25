import { SortState } from '../types/SortState';
import { ColumsIds } from './column-ids';

export const MAP_COLUMN_ID_TO_SORT_STATE_FIELD_NAME: Record<
  ColumsIds,
  keyof SortState
> = {
  sortByLastName: 'sortDirectionLastNameColumn',
  sortByName: 'sortDirectionNameColumn',
  sortByOpenPage: 'sortDirectionPageOpenColumn',
  sortBySex: 'sortDirectionSexColumn',
};
