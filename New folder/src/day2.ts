import express from 'express';
import bodyParser from 'body-parser';

import {PORT} from './config/constants';
import {mainRoute} from './config/router';

let app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/api', mainRoute);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
