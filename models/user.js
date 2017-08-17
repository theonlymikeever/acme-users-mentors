//faker util to generate randomized award names
const faker = require('faker');

//pull in DB
const db = require('./db');
const Sequelize = db.Sequelize;
const Awards = require('./awards');

const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

//class methods
User.findUsersViewModel = () => {
return User.findAll({
    include: [{ model: User, as: 'mentor' }, { model: Awards }]
  })
  .catch((err) =>{
    console.log(err)
  })
}

User.count = () => {
  return User.findAll()
    .then((results) => {
      let count = Object.keys(results).length;
      return count
    })
    .catch((err) => {
      console.log(err)
    });
}

User.destroyById = (id) => {
  return User.destroy({
    where: { id : id }
  })
  .catch((err) => {
    console.log(err)
  })
}

User.updateUserFromRequestBody = (userId, body) => {
  let mentorId = body.mentorId
  return User.findOne({
      where: {
        id: userId
      }
    })
    .then((userResult) => {
      if (!mentorId) {
        userResult.setMentor(null)
      } else {
        return User.findOne({where:{
          id: mentorId
        }})
        .then((foundMentor) => {
          userResult.setMentor(foundMentor)
        })
      }
    })
    .catch((err) => {
      console.log(err)
    })
}

User.generateAward = (id) => {
  return Awards.create({ award: faker.company.catchPhrase(), userId: id})
    .catch((err) => {
      console.log(err)
    });
}

User.removeAward = (userId, awardId) => {
  return Awards.destroy({
    where: {
      userId: userId,
      id: awardId
    }
  })
  .then(()=> {
    return User.findOne({
      where: {
        id: userId
      }, include: [{ model: Awards }]
    })
  })
  .then((user) => {
    console.log(user.awards.length)
    if (user.awards.length < 2){
      //no longer eligible to be a mentor
      //must find any poor mentorees
      return User.findAll({
        where: {
          mentorId: userId
        }
      })
    }
  })
  .then((foundUsers) => {
    return foundUsers.forEach(function(user) {
      return user.setMentor(null)
    })
  })
  .catch((err) =>{
    console.log(err)
  })
}

User.getEligibleMentors = function() {
  return User.findAll({
    include: [{ model: Awards }]
  })
  .then((results) => {
    // console.log(results)
    let names = []
     results.forEach(function(user){
      if (user.awards.length >= 2){
        names.push(user.name)
      }
    })
    return names
  })
  .catch((err) =>{
    console.log(err)
  })
}


// instance method
User.prototype.create = (name) => {
  return db.models.User.create({ name: name })
}


//exports
module.exports = User;
