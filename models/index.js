//requires
const db = require('./db');
const User = require('./user');
const Awards = require('./awards');

//association
Awards.belongsTo(User, {as: 'user'});
User.hasMany(Awards);
User.belongsTo(User, { as: 'mentor'});

//sync and seed
const sync = () => {
  return db.sync({ force: true });
};

const seed = () => {
  return require('./seed')(User, Awards)
};

//export
module.exports = {
  User: User,
  Awards: Awards,
  sync,
  seed
}
