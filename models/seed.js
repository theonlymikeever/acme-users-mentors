//this is a bunch of seed data to
//get the db up and running

//faker creates fake phrases to be used as awards
const faker = require('faker');
module.exports = (User, Awards) => {
  let ash, misty, brock;
  return Promise.all([
    User.create({ name: 'Ash' }),
    User.create({ name: 'Misty' }),
    User.create({ name: 'Brock', mentorId: 1})
  ])
  .then(([_ash, _misty, _brock]) => {
    ash = _ash;
    misty = _misty;
    brock = _brock;
    return Promise.all([
        Awards.create({ award: faker.company.catchPhrase(), userId: brock.id}),
        Awards.create({ award: faker.company.catchPhrase(), userId: brock.id}),
        Awards.create({ award: faker.company.catchPhrase(), userId: ash.id})
   ]);
  })
  .then(([award1, award2, award3]) => {
    return {
      award1,
      award2,
      award3,
      ash,
      misty,
      brock
    }
  })
}

