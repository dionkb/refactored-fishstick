const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { userRandomizer } = require('./data');
// const { userRandomizer, thoughtRandomizer, reactionRandomizer } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
  // Delete the collections if they exist
  let thoughtsDB = await connection.db.listCollections({ name: 'thoughts' }).toArray();
  if (thoughtsDB.length) {
    await connection.dropCollection('thoughts');
  }

  let usersDB = await connection.db.listCollections({ name: 'users' }).toArray();
  if (usersDB.length) {
    await connection.dropCollection('users');
  }

  const users = [];
  // const thoughts = thoughtRandomizer(10); TODO:

  for (let i = 0; i < 20; i++) {
    const userName = userRandomizer();;

    users.push({
      userName
    });
  }

  await User.collection.insertMany(users);
  // await Thought.collection.insertMany(thoughts); TODO:

  // TODO: loop through the saved thoughts, for each thought we need to generate a thought response and insert the thought responses
  console.table(users);
  // console.table(thoughts); TODO:
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
