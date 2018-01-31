
const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes/customerRoutes');
const knex = require('../db/knex');

const app = express();
module.exports = app;
app.knex = knex;

app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.json());

app.use('/api', router);

app.listen(3000);
console.log(`Web server listening at port: ${3000}`);
