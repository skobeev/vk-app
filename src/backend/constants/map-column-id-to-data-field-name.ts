import { TableRow } from '../types/TableRow';
import { ColumsIds } from './column-ids';

export const MAP_COLUMN_ID_TO_DATA_FIELD: Record<ColumsIds, keyof TableRow> = {
  sortByLastName: 'last_name',
  sortByName: 'first_name',
  sortByOpenPage: 'is_open_text',
  sortBySex: 'sex_text',
};
