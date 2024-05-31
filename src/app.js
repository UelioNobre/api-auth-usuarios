const express = require('express');
require('express-async-errors')

const helmet = require('helmet');
const cors = require('cors');

const routes = require('./routes');
const app = express();
const errorHandler = require('./middlewares/error.middleware');

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(routes);
app.use(errorHandler);

module.exports = app;
