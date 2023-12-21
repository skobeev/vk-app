import express from 'express';
import { Request } from 'express';
import { create } from 'express-handlebars';
import { PROXY_URL } from './src/constants/proxy-URL';
import { FriendListResponse } from './src/types/FriendListResponse';
import { MAP_SEX_ID_TO_STRING } from './src/constants/mapSexIdToString';
import { TableRow } from './src/backend/types/TableRow';
import { Sex } from './src/types/Sex';
import { getPagination } from './src/backend/helpers/get-pagination';
import { DEFAULT_PAGE_SIZE } from './src/backend/constants/default-page-size';
import { GetTableDataResponse } from './src/backend/types/get-table-data-reponse';
import { getQueryParamsForGetFriendsRequest } from './src/backend/helpers/get-query-params-for-get-friend-request';
import { FRIENDS_GET_METHOD } from './src/backend/constants/friends-get-method';
import { GetTableDataRequestParams } from './src/backend/types/get-table-data-request-params';
import { FRIEND_LIST_INITIAL_STATE } from './src/backend/constants/friend-list-default-state';
import { getSortStateAndSortTableRows } from './src/backend/helpers/get-sort-state-and-sort-table-rows';
import { getHandlebarsHelpers } from './src/backend/helpers/handlebars/handlebars';

const app = express();
const PORT = 3001;

app.use(express.static(__dirname + '/dist'));
app.use(express.static(__dirname + '/dist/src'));
app.use(express.static(__dirname + '/dist/src/scripts'));

const hbs = create({
  partialsDir: __dirname + '/views/partials',
  extname: '.hbs',
  defaultLayout: 'layout',
  layoutsDir: __dirname + '/views',
  helpers: getHandlebarsHelpers(),
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', './views');

app.get('/', (req: Request, res) => {
  res.render('layout');
});

app.get(
  '/getTableData',
  async function (
    req: Request<
      unknown,
      GetTableDataResponse,
      undefined,
      GetTableDataRequestParams
    >,
    res
  ) {
    const queryParams = getQueryParamsForGetFriendsRequest(req.query.userId);
    const url = PROXY_URL + FRIENDS_GET_METHOD + queryParams;

    let friendsResponse: FriendListResponse = FRIEND_LIST_INITIAL_STATE;

    try {
      const response = await fetch(url);
      if (response.ok) {
        const result = await response.json();

        if (result.error) {
          res.json({
            isSuccess: false,
            result: null,
            error: result.error.error_msg,
          });
          return;
        }

        friendsResponse = result.response as FriendListResponse;
      }
    } catch (error) {
      res.json({
        isSuccess: false,
        result: null,
        error: `Неизвестная ошибка. Обратитесь к администратору. ${JSON.stringify(
          error
        )}`,
      });
      return;
    }

    let tableRows = friendsResponse.items.map<TableRow>((friend) => ({
      first_name: friend.first_name,
      last_name: friend.last_name,
      sex: friend.sex,
      is_closed: friend.is_closed,
      sex_text: MAP_SEX_ID_TO_STRING[friend.sex],
      is_open_text: friend.is_closed ? 'нет' : 'да',
      friend_vk_page_link: `https://vk.com/${friend.domain}`,
    }));

    const sortState = getSortStateAndSortTableRows(
      req.query.sortDirection,
      req.query.sortedColumnId,
      tableRows
    );

    if (!req.query.isMan || !req.query.isWoman) {
      tableRows = tableRows.filter((user) =>
        user.sex === Sex.Male ? req.query.isMan : req.query.isWoman
      );
    }

    const currentPage = req.query.currentPage
      ? Number(req.query.currentPage)
      : 1;

    const pagination = getPagination({
      currentPage,
      tableRowsCount: tableRows.length,
    });

    const rowsData = pagination
      ? tableRows.slice(
          (currentPage - 1) * DEFAULT_PAGE_SIZE,
          currentPage * DEFAULT_PAGE_SIZE + 1
        )
      : tableRows;

    const tableBody = await hbs.render(
      __dirname + '/views/partials/table.hbs',
      {
        head: {
          ...req.query,
          ...sortState,
        },
        rows: rowsData,
        pagination,
      }
    );

    const responseBody = {
      isSuccess: true,
      result: tableBody,
      error: null,
    };

    res.json(responseBody);
  }
);

app.listen(PORT, () => {
  console.log('listen', PORT);
});
