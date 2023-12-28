import { FriendsListItem } from '../../api/get-table-data/dto/friends-list-item';

export interface TableRow extends Partial<FriendsListItem> {
  sex_text: string;
  is_open_text: string;
}
