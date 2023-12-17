import express from 'express';
import { Request } from 'express';
import { create } from 'express-handlebars';
import { createStringWithQueryParams } from './src/helpers/createStringWithURLParams';
import { API_VERSION } from './src/constants/api-version';
import { TOKEN } from './src/token';
import { PROXY_URL } from './src/constants/proxy-URL';
import { FriendListResponse } from './src/types/FriendListResponse';
import { GetTableDataRequestParams } from './src/api/get-table-data/dto/get-table-data-request-params';
import { MAP_SEX_ID_TO_STRING } from './src/constants/mapSexIdToString';
import { SortOrder } from './src/types/SortOrder';
import { TableRow } from './src/backend/types/TableRow';

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
  helpers: {
    if_eq: function (
      a: any,
      b: any,
      opts: { fn: (arg0: any) => any; inverse: (arg0: any) => any }
    ) {
      if (a == b) {
        return opts.fn(this);
      } else {
        return opts.inverse(this);
      }
    },
    is_empty_array: function (
      array: unknown[] | undefined,
      opts: { fn: (arg0: any) => any; inverse: (arg0: any) => any }
    ) {
      return array?.length ? opts.inverse(this) : opts.fn(this);
    },
    compare: function (
      a: any,
      b: any,
      opts: { fn: (arg0: any) => any; inverse: (arg0: any) => any }
    ) {
      if (a > b) {
        return opts.fn(this);
      } else {
        return opts.inverse(this);
      }
    },
  },
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', './views');

app.get('/', (req: Request<any, any, any, any>, res) => {
  res.render('layout');
});

app.get(
  '/getTableData',
  async function (req: Request<any, any, any, GetTableDataRequestParams>, res) {
    if (!req.query.userId) {
      res.json({
        isSuccess: false,
        result: null,
        error: 'id пользователя не определен',
      });
      return;
    }

    const queryParamsModel = [
      {
        name: 'user_id',
        value: req.query.userId,
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

    const queryParams = createStringWithQueryParams(queryParamsModel);

    const METHOD = '/friends.get';
    const url_service = PROXY_URL + METHOD + '?' + queryParams;

    let friendsResponse: FriendListResponse = {
      count: 0,
      items: [],
    };

    try {
      const response = await fetch(url_service);

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
      console.error(error);
    } finally {
    }

    // не удается извлечь json...
    // const tableBody = await hbs.getPartials({
    //   precompiled: true,
    // });

    const tableRows = friendsResponse.items.map<TableRow>((friend) => ({
      first_name: friend.first_name,
      last_name: friend.last_name,
      sex: friend.sex,
      is_closed: friend.is_closed,
      sex_text: MAP_SEX_ID_TO_STRING[friend.sex],
      is_open_text: friend.is_closed ? 'нет' : 'да',
      friend_vk_page_link: `https://vk.com/${friend.domain}`,
    }));

    if (req.query.sortDirectionSexColumn) {
      tableRows.sort((a, b) => {
        if (req.query.sortDirectionSexColumn === SortOrder.Asc) {
          return a.sex_text > b.sex_text ? 1 : -1;
        } else {
          return a.sex_text < b.sex_text ? 1 : -1;
        }
      });
    }

    const PAGE_SIZE = 20;
    const totalPages = Math.ceil(tableRows.length / PAGE_SIZE);
    const currentPage = req.query.currentPage
      ? Number(req.query.currentPage)
      : 1;

    const paginationButtons = {
      buttonPrev: totalPages > 6,
      buttonNext: totalPages > 6,
      buttons:
        totalPages > 6
          ? [currentPage, currentPage + 1, false, totalPages - 1, totalPages]
          : Array(6)
              .fill('')
              .map((_, index) => ++index),
    };

    const pagination =
      tableRows.length <= PAGE_SIZE
        ? null
        : {
            currentPage,
            pageSize: PAGE_SIZE,
            totalPages: Math.ceil(tableRows.length / PAGE_SIZE),
            paginationButtons,
          };

    const tableBody = await hbs.render(
      __dirname + '/views/partials/table.hbs',
      {
        head: req.query,
        rows: pagination
          ? tableRows.slice(
              (currentPage - 1) * PAGE_SIZE,
              currentPage * PAGE_SIZE + 1
            )
          : tableRows,
        pagination,
      }
    );

    const responseBody = {
      isSuccess: true,
      result: tableBody,
    };

    res.json(responseBody);
  }
);

app.listen(PORT, () => {
  console.log('listen', PORT);
});
