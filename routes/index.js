//requires
const router = require('express').Router();
var models = require('../models');
var Awards = models.Awards;
var User = models.User;

//routes
router.use('/', (req, res, next) => {

  //for testing only, remove before launch
  const UserData =
      User.findAll()
        .then((results) => {
          console.log(results.dataValues)
          return results.dataValues
        })
        .catch(next);
    const AwardsData =
      Awards.findAll()
        .then((results) => {
          // console.log()
          return results.dataValues
        })
        .catch(next);

  res.render('index', { UserData, AwardsData });
});

//export
module.exports = router;
