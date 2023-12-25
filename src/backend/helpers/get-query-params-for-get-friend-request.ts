import { API_VERSION } from '../../constants/api-version';
import { createStringWithQueryParams } from '../../helpers/createStringWithURLParams';
import { TOKEN } from '../../token';

export const getQueryParamsForGetFriendsRequest = (userId: string) => {
  const queryParamsModel = [
    {
      name: 'user_id',
      value: userId,
    },
    {
      name: 'fields',
      value: 'sex,domain',
    },
    {
      name: 'v',
      value: API_VERSION,
    },
    {
      name: 'access_token',
      value: TOKEN,
    },
  ];

  return createStringWithQueryParams(queryParamsModel);
};
