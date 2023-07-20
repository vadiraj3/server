const express = require('express');
const router = express.Router();

const { getActorInfo, getActorMovies } = require('../controllers/actor');

router.get('/actor', getActorInfo);
router.get('/actor-movies', getActorMovies);

module.exports = router;
