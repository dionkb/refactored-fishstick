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
    // POST to create a new thought TODO: Add the though to users array of thoughts?
    async createThought(req, res) {
        try {
            const newThoughtData = await Thought.create(req.body);
            res.json(newThoughtData);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // PUT to update an existing thought
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
};