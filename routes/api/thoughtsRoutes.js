const router = require('express').Router();
const { getThoughts, getOneThought, createThought, updateThought, deleteThought } = require('../../controllers/thoughtsController');

// For the api/thoughts endpoint
router.route('/').get(getThoughts).post(createThought);

// For the api/thoughts/:id endpoint
router.route('/:thoughtId').get(getOneThought).put(updateThought).delete(deleteThought);

module.exports = router;