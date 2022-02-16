const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const newsRouter = require('./app/api/News/router');

const app = express();
const useAPIV1 = (path, router) => app.use(`/api/v1${path}`, router);

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

useAPIV1('/news', newsRouter);

module.exports = app;
