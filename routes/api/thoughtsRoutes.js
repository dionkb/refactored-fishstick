const router = require('express').Router();
const { getThoughts, getOneThought, createThought, updateThought, deleteThought, createReaction, deleteReaction } = require('../../controllers/thoughtsController');

// For the api/thoughts endpoint
router.route('/').get(getThoughts).post(createThought);

// For the api/thoughts/:thoughtId endpoint
router.route('/:thoughtId').get(getOneThought).put(updateThought).delete(deleteThought);

// For the api/thoughts/:thoughtId/reactions endpoint
router.route('/:thoughtId/reactions').post(createReaction).delete(deleteReaction);

module.exports = router;