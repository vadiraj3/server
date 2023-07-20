const express = require('express');
const router = express.Router();

const {
	addTrailerandImdb,
	movieCastInfo,
	addMovieGenre,
	addMovie,
} = require('../controllers/movieApi');

router.post('/update-movie-trailer-and-imdb', addTrailerandImdb);

//movie_cast info
router.post('/add-movie-cast', movieCastInfo);

//adding genre to the movies
router.post('/add-movie-genre', addMovieGenre);

//adding a movie
router.post('/add-movie', addMovie);

module.exports = router;
