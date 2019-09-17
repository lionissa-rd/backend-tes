import express from 'express';
import bodyParser from 'body-parser';

let app = express();

let db = {
  tasks: [
    {
      id: 1,
      name: 'masak nasi',
    },
    {
      id: 2,
      name: 'masak air',
    },
  ],
};

// .use === middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
// app.use((req, res, next) => {
//   console.log('saya kemasukan request baru');
//   next();
// });

app.get('/', (req, res) => {
  res.send('success');
});

// params
app.get('/task/:id', (req, res) => {
  // let param = req.params.id;
  // res.send('success with id ' + param);
  let id = req.params.id;
  for (let i = 0; i < db.tasks.length; i++) {
    if (db.tasks[i].id === Number(id)) {
      res.json(db.tasks[i]);
    }
  }
});

// query params
app.get('/task/', (req, res) => {
  // let searchKeyword = req.query.keyword;
  // if (searchKeyword) {
  //   res.send('success keyword = ' + searchKeyword);
  // } else {
  //   res.send('success without keyword');
  // }
  res.json(db.tasks);
});

app.post('/task', (req, res) => {
  let body = req.body;
  // body akan undefined apabila belum ada bodyParser
  res.json(body); // memastikan return dari backend adalah json
  db.tasks.push(body);
  // res.send(body);
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
