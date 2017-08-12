//requires
const router = require('express').Router();
var models = require('../models');
var Awards = models.Awards;
var User = models.User;

//routes
router.use('/', (req, res, next) => {

  //for testing only, remove before launch
    let findUsers = User.findAll();
    let findAwards = Awards.findAll();

    Promise.all([
      findUsers, findAwards
    ])
    .then((results) => {
      let UserData = results[0];
      let AwardData = results[1];
      res.render('index', { users: UserData, awards: AwardData, nav: 'home'});
    })
    .catch(next);

  // res.render('index', { UserData });
});

//export
module.exports = router;
