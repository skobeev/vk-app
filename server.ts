import express from 'express';
import { Request } from 'express';
import hbs from 'hbs';

hbs.registerPartials(__dirname + '/views/partials', function () {
  console.log('ok');
});

const app = express();
const PORT = 3001;

app.use(express.static(__dirname + '/dist'));
app.use(express.static(__dirname + '/dist/src'));
app.use(express.static(__dirname + '/dist/src/scripts'));
app.set('view engine', 'hbs');

app.get('/', (req: Request<any, any, any, any>, res) => {
  // res.sendFile(path.join(__dirname, '/test.html'));
  // res.render('');
  res.render('layout');
});

app.listen(PORT, () => {
  console.log('listen', PORT);
});
