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
  },
  status: {
    type: Sequelize.STRING
  },
});


//class methods
User.findUsersViewModel = () => {
  return User.findAll({
    include : [Awards]
  })
  .then((results) => {
      // console.log(results)
      return results
    })
    .catch((err) => {
      console.log(err)
    });

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

User.updateUserFromRequestBody = () => {

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
