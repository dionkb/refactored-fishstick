const router = require('express').Router();
// const { TODO: } = require('../../models');

// The `/api/users` endpoint

// GET all users
router.get('/', async (req, res) => {
    // TODO:
    // try {
    //     res.status(200).json(userData);
    // } catch (err) {
    //     res.status(500).json(err);
    // }
});

// POST a new user
router.post('/', async (req, res) => {
    // TODO:
    // try {
    //     res.status(200).json(userData);
    // } catch (err) {
    //     res.status(500).json(err);
    // }
});

// GET a single user by its '_id' and populate with 'thought' and 'friend' data
router.get('/:id', async (req, res) => {
    // TODO:
    // try {
    //     res.status(200).json(userData);
    // } catch (err) {
    //     res.status(500).json(err);
    // }
});

// UPDATE a user by its '_id'
router.put('/:id', (req, res) => {
    // TODO:
    // try {
    //     res.status(200).json(userData);
    // } catch (err) {
    //     res.status(500).json(err);
    // }
});

// DELETE a user by its '_id'
router.delete('/:id', (req, res) => {
    // TODO:
    // try {
    //     res.status(200).json(userData);
    // } catch (err) {
    //     res.status(500).json(err);
    // }
});

module.exports = router;