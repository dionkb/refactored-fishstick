const { User, Thought } = require('../models');

// The `/api/thoughts` endpoint
module.exports = {
    // GET all thoughts
    async getThoughts(req, res) {
        try {
            const thoughtsData = await Thought.find();
            res.status(200).json(thoughtsData);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // GET a single thought
    async getOneThought(req, res) {
        try {
            const thoughtData = await Thought.findOne({ _id: req.params.thoughtId })
        
            if (!thoughtData) {
                return res.status(404).json({ message: 'No thought found with that ID number' });
            }
            res.json(thoughtData);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // POST to create a new thought
        // Formatting example
        // {
        // 	"thoughtText": "Hello! This is a test thought!",
        // 	"username": "UpdatedTestMan",
        //  "userId": "FIXME: Add the _id for the user here"
        // }
    async createThought(req, res) {
        try {
            const newThoughtData = await Thought.create(req.body);

            const userData = await User.findByIdAndUpdate(
                    req.body.userId, 
                    { $addToSet: { thoughts: newThoughtData._id } },
                    { runValidators: true, new: true }
                )
            res.json({ newThoughtData, userData });
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // PUT to update an existing thought
        // Formatting example
        // {
        // 	"thoughtText": "Goodbye! I've edited my thoughts!",
        // }
    async updateThought(req, res) {
        try {
            const thoughtData = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true }
            );    
            if (!thoughtData) {
                return res.status(404).json({ message: 'No thought found with this ID number' });
            }    
            res.json(thoughtData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    // DELETE a thought by its '_id'
    async deleteThought(req, res) {
        try {
            const thoughtData = await Thought.findOneAndRemove({ _id: req.params.thoughtId });
            if (!thoughtData) {
                return res.status(404).json({ message: 'No thought found with this ID number' });
            }
            res.json({ message: 'Thought successfully deleted!' });
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // POST to create a new reaction to a thought
        // Formatting example
        // {
        // 	"reactionBody": "Mamma mia that's a spicy thought!",
        // 	"username": "MsReaction"
        // }
    async createReaction(req, res) {
        try {
            const thoughtData = await Thought.findOneAndUpdate(
                    { _id: req.params.thoughtId }, 
                    { $addToSet: { reactions: req.body } },
                );
            
            res.json({ thoughtData });
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // DELETE a reaction by its '_id'
        // Formatting example
        // {
        //     "reactionId": "FIXME: Add the _id for the reaction here"
        // }
    async deleteReaction(req, res) {
        try {
            const thoughtData = await Thought.findOneAndUpdate(
                    { _id: req.params.thoughtId },
                    { $pull: { reactions: req.body.reactionId }}
                );
            if (!thoughtData) {
                return res.status(404).json({ message: 'No thought found with this ID number' });
            }
            res.json({ message: 'Reaction successfully deleted!' });
        } catch (err) {
            res.status(500).json(err);
        }
    },
};