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

}

User.destoryById = () => {

}

User.updateUserFromRequestBody = () => {

}

User.generateAward = () => {

}

User.removeAward = () => {

}


//exports
module.exports = User;
