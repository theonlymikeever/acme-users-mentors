//pull in DB
const db = require('./db');
const Sequelize = db.Sequelize;

const Awards = db.define('awards', {
  award: {
    type : Sequelize.TEXT
  }
})

module.exports = Awards;
