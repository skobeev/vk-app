import { Sex } from '../../../types/Sex';

export interface FriendsListItem {
  can_access_closed: boolean;
  first_name: string;
  id: number;
  is_closed: boolean;
  last_name: string;
  sex: Sex;
  track_code: string;
}
