const { User, Thought } = require('../models');

// The `/api/users` endpoint
module.exports = {
    // GET all users
    async getUsers(req, res) {
        try {
            const usersData = await User.find();
            res.status(200).json(usersData);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // GET a single user
    async getOneUser(req, res) {
        try {
            const userData = await User.findOne({ _id: req.params.userId })
            if (!userData) {
                return res.status(404).json({ message: 'No user found with that ID number' });
            }
            res.json(userData);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // POST to create a new user
    async createUser(req, res) {
        try {
            const newUserData = await User.create(req.body);
            res.json(newUserData);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // PUT to update an existing user
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
};