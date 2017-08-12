// requires
const express = require('express');
const nunjucks = require('nunjucks');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

//instance and config
const app = express();
nunjucks.configure('views', { noCache: true });
app.set('view engine', 'html');
app.engine('html', nunjucks.render);

//middleware
app.use(morgan('dev'));
app.use(bodyParser.urelencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use('/', './routes/');

//static routes

//error handling
app.use('/', (err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).send(err.message);
});

//app export
module.exports = app;
