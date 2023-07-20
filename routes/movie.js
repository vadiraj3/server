const express = require('express');
const router = express.Router();
const auth = require('../middleware/authentication');
const {
	getMovies,
	getGenres,
	getMoviesByGenre,
	getMoviesByQuery,
	getMovieInfo,
	getMoviesRecommendations,
	getFavoritedMoviesData,
	getWatchlistedMoviesData,
} = require('../controllers/movie');

router.route('/popular').get(getMovies);
router.route('/genres').get(getGenres);
router.route('/genreId/page').get(getMoviesByGenre);
router.route('/query').get(getMoviesByQuery);
router.route('/movie-details').get(getMovieInfo);
router.get('/movie-recommendations', getMoviesRecommendations);
router.get('/get-watchlisted-movies-data', getWatchlistedMoviesData);
router.get('/get-favorite-movies-data', getFavoritedMoviesData);

module.exports = router;
