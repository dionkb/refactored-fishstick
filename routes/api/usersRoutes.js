const router = require('express').Router();
const { getUsers, getOneUser, createUser, updateUser, deleteUser, addFriend, deleteFriend } = require('../../controllers/usersController');

// For the api/users endpoint
router.route('/').get(getUsers).post(createUser);

// For the api/users/:userId endpoint
router.route('/:userId').get(getOneUser).put(updateUser).delete(deleteUser);

// For the api/users/:userId/friends/:friendId endpoint
router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);

module.exports = router;