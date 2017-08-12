// requires
const express = require('express');
const nunjucks = require('nunjucks');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const path = require('path');
const models = require('./models');

//instance and config
const app = express();
const usersRouter = require('./routes/users');
nunjucks.configure('views', { noCache: true });
app.set('view engine', 'html');
app.engine('html', nunjucks.render);

//middleware and static routes
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use('/vendor', express.static(path.join(__dirname, 'node_modules')));
app.use('/public', express.static(path.join(__dirname, 'public')));

//nav tab count
app.use((req, res, next) => {
  models.User.count()
    .then((result) => {
      res.locals.count = result;
      next();
    })
    .catch((err) => {
      next(err);
    })
})

//routes
app.use('/users', usersRouter);
app.use('/', require('./routes/'));

//error handling
app.use('/', (err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).send(err.message);
});

//app export
module.exports = app;
