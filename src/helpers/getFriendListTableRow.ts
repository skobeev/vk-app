import { MAP_SEX_ID_TO_STRING } from '../constants/mapSexIdToString';
import { FriendsListItem } from '../types/FriendsListItem';

export const getFriendListTableRow = (friend: FriendsListItem): string => {
  const sexText = MAP_SEX_ID_TO_STRING[friend.sex];
  return `<tr>
            <td class="table__cell">
                ${friend.first_name}
            </td>
            <td class="table__cell">
                ${friend.last_name}
            </td>
            <td class="table__cell">
                ${sexText}
            </td>
            <td class="table__cell"> 
                ${friend.is_closed ? 'нет' : 'да'}
            </td>
        </tr>`;
};
