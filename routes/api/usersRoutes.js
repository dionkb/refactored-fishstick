const router = require('express').Router();
const { getUsers, getOneUser, createUser, updateUser, deleteUser } = require('../../controllers/usersController');

// For the api/users endpoint
router.route('/').get(getUsers).post(createUser);

// For the api/users/:userId endpoint
router.route('/:userId').get(getOneUser).put(updateUser).delete(deleteUser);

module.exports = router;