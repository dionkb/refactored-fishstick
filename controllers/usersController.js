const { User } = require('../models');

// The `/api/users` endpoint
module.exports = {
    // GET all users
    async getUsers(req, res) {
        try {
            const usersData = await User.find()
                .select('-__v');
    
            res.status(200).json(usersData);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // GET a single user
    async getOneUser(req, res) {
        try {
            const userData = await User.findOne({ _id: req.params.userId })
                .select('-__v')
                .populate('thoughts')
                .populate('friends');
    
            if (!userData) {
                return res.status(404).json({ message: 'No user found with that ID number' });
            }
            res.json(userData);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // POST to create a new user
        // Formatting example
        // {
        // 	"username": "Testman",
        // 	"email": "emailtest@gmail.com"
        // }
    async createUser(req, res) {
        try {
            const newUserData = await User.create(req.body);
            res.json(newUserData);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // PUT to update an existing user
        // Formatting example
        // {
        // 	"username": "UpdatedTestMan",
        // }
    async updateUser(req, res) {
        try {
            const userData = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true }
            );    
            if (!userData) {
                return res.status(404).json({ message: 'No user found with this ID number' });
            }    
            res.json(userData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    // DELETE a user by its '_id'
    async deleteUser(req, res) {
        try {
            const userData = await User.findOneAndRemove({ _id: req.params.userId });
            if (!userData) {
                return res.status(404).json({ message: 'No user found with this ID number' });
            }
            res.json({ message: 'User successfully deleted!' });
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // POST to add a new friend to user's friend list
    // Formatting example
    // {
    // 	"username": "Testman",
    // 	"email": "emailtest@gmail.com"
    // }
    async addFriend(req, res) {
        try {
            const newFriendData = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.params.friendId } },
                { runValidators: true, new: true }
            );
            res.json(newFriendData);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // DELETE a friend from a user's friend list using it's _id value
    async deleteFriend(req, res) {
        try {
            const userData = await User.findOneAndUpdate(
                    { _id: req.params.userId },
                    { $pull: { friends: req.params.friendId }}
                );
            if (!userData) {
                return res.status(404).json({ message: 'No user/friend found with this ID number' });
            }
            res.json({ message: 'Friend successfully removed!' });
        } catch (err) {
            res.status(500).json(err);
        }
    },
};