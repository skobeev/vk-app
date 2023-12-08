import express from 'express';
import { Request } from 'express';
import { create } from 'express-handlebars';
import { createStringWithQueryParams } from './src/helpers/createStringWithURLParams';
import { API_VERSION } from './src/constants/api-version';
import { TOKEN } from './src/token';
import { PROXY_URL } from './src/constants/proxy-URL';
import { FriendListResponse } from './src/types/FriendListResponse';
import { GetTableDataRequestParams } from './src/api/get-table-data/dto/get-table-data-request-params';

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
    const queryParams = createStringWithQueryParams([
      {
        name: 'user_id',
        value: '101606976',
      },
      {
        name: 'fields',
        value: 'sex',
      },
      {
        name: 'v',
        value: API_VERSION,
      },
      {
        name: 'access_token',
        value: TOKEN,
      },
    ]);

    const METHOD = '/friends.get';
    const url_service = PROXY_URL + METHOD + '?' + queryParams;
    console.log('url_service', url_service);

    try {
      const response = await fetch(url_service);

      if (response.ok) {
        const result = await response.json();
        if (result.error) {
          return;
        }

        const friendsResponse = result.response as FriendListResponse;
        // console.log('friendRespons', friendsResponse);
      }
    } catch (error) {
      console.error(error);
    } finally {
      // loader?.classList.add('loader_hidden');
    }

    // не удается извлечь json...
    // const tableBody = await hbs.getPartials({
    //   precompiled: true,
    // });
    console.log('req', req.query);
    const tableBody = await hbs.render(
      __dirname + '/views/partials/table.hbs',
      {
        title: 'ok',
        columns: req.query,
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
