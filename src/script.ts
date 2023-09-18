import { createStringWithQueryParams } from './helpers/createStringWithURLParams';
import { getFriendListTableRow } from './helpers/getFriendListTableRow';
import { TOKEN } from './token';
import { FriendListResponse } from './types/FriendListResponse';

const URL = 'http://localhost:8010/proxy/method/';
const METHOD = 'friends.get';

async function getFriends(): Promise<void> {
  const userId = (document.querySelector('#userId') as HTMLInputElement).value;

  const queryParams = createStringWithQueryParams([
    {
      name: 'user_id',
      value: userId,
    },
    {
      name: 'fields',
      value: 'sex',
    },
    {
      name: 'v',
      value: '5.131',
    },
    {
      name: 'access_token',
      value: TOKEN,
    },
  ]);
  const url_service = URL + METHOD + '?' + queryParams;
  const loader = document.querySelector('.loader');
  try {
    loader?.classList.remove('loader_hidden');
    const response = await fetch(url_service);

    if (response.ok) {
      const result = await response.json();
      if (result.error) {
        console.log('error', result.error.error_msg);
        return;
      }

      const friendsResponse = result.response as FriendListResponse;
      console.log(result);
      let tableBodyHTML = '';
      friendsResponse.items.forEach((friend) => {
        const row = getFriendListTableRow(friend);
        tableBodyHTML += row;
      });
      const tableBody = document.querySelector('#tableBody');
      if (tableBody) {
        tableBody.innerHTML = tableBodyHTML;
      }
      // //@ts-ignore
      // window.friends = result.items;
      return;
    }
  } catch (error) {
    console.error(error);
  } finally {
    loader?.classList.add('loader_hidden');
  }
}

document.querySelector('#get')?.addEventListener('click', () => {
  console.log('click');
  getFriends();
});

document
  .querySelector('.filter-panel__footer')
  ?.addEventListener('click', (event) => {
    document
      .querySelector('.filter-panel')
      ?.classList.toggle('filter-panel_hidden');
  });