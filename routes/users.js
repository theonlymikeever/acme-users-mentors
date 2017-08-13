// requires
const router = require('express').Router();
const models = require('../models/');
const path = require('path')
const User = models.User;

//util
const redirect = (res)=> {
  return ()=> {
    res.redirect('/users');
  };
};

//READ
router.get('/', (req, res, next)=> {
  User.findUsersViewModel()
    .then(( results )=> {
      let users = results[0];
      let possibleMentorees = results[1];
      console.log(users.mentorId)
      res.render('users', { users, possibleMentorees, nav: 'users' });
    })
    .catch(next);
});

//CREATE
router.post('/', (req, res, next)=> {
  User.create(req.body)
    .then(redirect(res))
    .catch(next);
});


// router.post('/', (req, res, next)=> {
//   User.create(req.body)
//     .then((res) => {
//       let location = req.headers.referer.split(req.host)[1]
//       // console.log(location.indexOf('users'));
//       if (location.indexOf('users') < 0){
//         res.redirect();
//       } else {
//         console.log('else')
//         res.redirect(res)
//       }
//     })
//     .catch(next);
// });

//DELETE
router.delete('/:id', (req, res, next)=> {
  User.destroyById(req.params.id)
    .then(redirect(res))
    .catch( next);
});

//UPDATE
router.put('/:id', (req, res, next)=> {
  User.updateUserFromRequestBody(req.params.id, req.body)
    .then(redirect(res))
    .catch(next);
});

//CREATE AWARD
router.post('/:id/awards', (req, res, next)=> {
  User.generateAward(req.params.id)
    .then(redirect(res))
    .catch(next);
});

//DELETE AWARD
router.delete('/:userId/awards/:id', (req, res, next)=> {
  User.removeAward(req.params.userId, req.params.id)
    .then(redirect(res))
    .catch( next);
});

module.exports = router;
