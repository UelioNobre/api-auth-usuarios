
require('express-async-errors');
const express = require('express');

const database = require('./db');
database();

const helmet = require('helmet');
const cors = require('cors');

const routes = require('./routes');
const app = express();
const errorHandler = require('./middlewares/error.middleware');
const connectDatabase = require('./db');


app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(routes);
app.use(errorHandler);

module.exports = app;
