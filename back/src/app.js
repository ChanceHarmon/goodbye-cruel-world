'use strict'

const express = require('express');

const cors = require('cors');

const morgan = require('morgan');

const app = express();
const apiRouter = require('./routes/api.js');

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(apiRouter);

app.listen(8080, () => {
  console.log('server up on 8080');
});