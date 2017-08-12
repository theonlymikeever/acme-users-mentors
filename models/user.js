//faker util to generate randomized award names
const faker = require('faker');

//pull in DB
const db = require('./db');
const Sequelize = db.Sequelize;

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
  return User.findAll()
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

User.generateAward = () => {

}

User.removeAward = () => {

}

// instance method
User.prototype.create = (name) => {
  return db.models.User.create({ name: name })
}

//exports
module.exports = User;
