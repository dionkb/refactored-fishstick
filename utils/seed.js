const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { userRandomizer, thoughtRandomizer } = require('./data');
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

  for (let i = 0; i < 10; i++) {
    const username = userRandomizer();

    users.push({
      username
    });
  }

  // const thoughts = [];

  // for (let i = 0; i < 20; i++) {
  //   const randomThoughts = thoughtRandomizer();

  //   thoughts.push({
  //     randomThoughts
  //   });
  // }

  await User.collection.insertMany(users);
  // await Thought.collection.insertMany(thoughts);

  console.table(users);
  // console.table(thoughts);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
