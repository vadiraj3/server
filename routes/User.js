const express = require('express');
const router = express.Router();
const auth = require('../middleware/authentication');

const {
	register,
	login,
	addToFavorites,
	getFavorites,
	addToWatchlisted,
	getWatchListed,
} = require('../controllers/user');

router.post('/register', register);
router.post('/login', login);
router.post('/add-to-favorites', auth, addToFavorites);
router.get('/get-favorites', auth, getFavorites);
router.post('/add-to-watchlisted', auth, addToWatchlisted);
router.get('/get-watchlisted', auth, getWatchListed);

module.exports = router;
