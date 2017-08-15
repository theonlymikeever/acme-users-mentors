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

  // return User.findAll({
  //   include : [Awards]
  // })
  // .then((results) => {
  //   //add our record award amount for future logic
  //     results.forEach((item) => {
  //       if (item.mentorId != null){
  //          User.findAll({
  //           where: {
  //             id : item.mentorId
  //           }
  //         })
  //         .then((foundMentor) => {
  //           console.log(item.name + "'s mentor is " + foundMentor[0].name)
  //           item.mentorName = foundMentor[0].name;
  //         })
  //         .catch((err) => {
  //           console.log(err);
  //         })
  //       }
  //       item.awardAmount = Object.keys(item.awards).length
  //     })
  //     return results
  //   })
  //   .catch((err) => {
  //     console.log(err)
  //   });

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
  //may need to add instance where user has their awards
  //revoked and can no longer be a mentor
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
