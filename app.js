const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const error = require('./middlewares/error');
const cors = require('./middlewares/cors');
const limiter = require('./middlewares/rateLimiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const routes = require('./routes/index');
const { SERVER_START } = require('./utils/constants');
const { PORT, MONGOD_SERVER } = require('./utils/config');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(MONGOD_SERVER, {
  useNewUrlParser: true,
});

app.use(requestLogger);
app.use(limiter);
app.use(cors);
app.use(helmet());

app.use(routes);

app.use(errorLogger);
app.use(errors());
app.use(error);

app.listen(PORT, () => {
  console.log(SERVER_START, PORT);
});
