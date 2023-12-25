import { SortOrder } from '../../types/SortOrder';
import { ColumsIds } from '../constants/column-ids';
import { MAP_COLUMN_ID_TO_DATA_FIELD } from '../constants/map-column-id-to-data-field-name';
import { MAP_COLUMN_ID_TO_SORT_STATE_FIELD_NAME } from '../constants/map-column-id-to-sort-state-field-name';
import { SortState } from '../types/SortState';
import { TableRow } from '../types/TableRow';

const INITIAL_SORT_STATE: SortState = {
  sortDirectionNameColumn: '',
  sortDirectionLastNameColumn: '',
  sortDirectionSexColumn: '',
  sortDirectionPageOpenColumn: '',
};

export const getSortStateAndSortTableRows = (
  sortDirection: SortOrder,
  sortedColumnId: ColumsIds,
  tableRows: TableRow[]
) => {
  if (!sortDirection) {
    return INITIAL_SORT_STATE;
  }

  const sortState = {
    ...INITIAL_SORT_STATE,
  };

  const fieldName = MAP_COLUMN_ID_TO_SORT_STATE_FIELD_NAME[sortedColumnId];
  sortState[fieldName] = sortDirection;
  const sortedFieldName = MAP_COLUMN_ID_TO_DATA_FIELD[sortedColumnId];

  tableRows.sort((a, b) => {
    if (sortDirection === SortOrder.Asc) {
      return a[sortedFieldName]! > b[sortedFieldName]! ? 1 : -1;
    } else {
      return a[sortedFieldName]! < b[sortedFieldName]! ? 1 : -1;
    }
  });

  return sortState;
};
