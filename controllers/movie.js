const Movie = require('../model/Movie');
const { StatusCodes } = require('http-status-codes');
const BadRequestError = require('../errors/bad-request');
const UnauthenticatedError = require('../errors/unauthenticated');
const MovieModel = new Movie();

const User = require('../model/User');

const url = require('url');

const getMovies = async (req, res) => {
	const result = await MovieModel.getMovies(req.query.page);
	res.status(StatusCodes.CREATED).json({ msg: 'Successs', result });
};

const getMoviesByGenre = async (req, res) => {
	const { genreId, page } = req.query;
	let movieIds = '';
	let result = '';
	if (genreId == 'top_rated' || genreId == 'upcoming' || genreId == 'popular') {
		result = await MovieModel.getMoviesByGenreType(genreId, page);
	} else {
		movieIds = await MovieModel.getMoviesByGenre(
			req.query.genreId,
			req.query.page
		);

		const movie = [];
		movieIds.map((item, index) => {
			let { movie_id } = movieIds[index];
			movie.push(movie_id);
		});

		result = await MovieModel.getMoviesByIds(movie);
	}
	res.status(StatusCodes.OK).json({ msg: 'Success', result });
};

const getMoviesRecommendations = async (req, res) => {
	const result = await MovieModel.getMoviesOfSameGenreByMovieId(
		req.query.movieId
	);

	res.status(StatusCodes.OK).json({ msg: 'Success', result });
};

const getMoviesByQuery = async (req, res) => {
	const result = await MovieModel.getMoviesByQuery(req.query.query);

	res.status(StatusCodes.OK).json({ msg: 'Success', result });
};

const getGenres = async (req, res) => {
	const result = await MovieModel.getGenres();
	res.status(StatusCodes.CREATED).json({ msg: 'Success', result });
};

const getMovieInfo = async (req, res) => {
	const movieInfo = await MovieModel.getMovieInfo(req.query.id);

	const genreInfo = await MovieModel.getGenreNames(req.query.id);
	const movieCast = await MovieModel.getMovieCast(req.query.id);

	const actorInfo = await MovieModel.getMovieCastInfo(req.query.id);
	res
		.status(StatusCodes.CREATED)
		.json({ msg: 'Success', movieInfo, genreInfo, movieCast, actorInfo });
};

// get-favorited - movies - data

const getFavoritedMoviesData = async (req, res) => {
	const favoritedMovies = await User.getFavorites(req.query.id);
	const resu = JSON.parse(favoritedMovies[0].favorites).favorites;
	const array = [];
	resu.map((item) => {
		array.push(item);
	});

	const result = await MovieModel.getMoviesByIds(array);
	res.status(StatusCodes.OK).json({ result });
};

// get-watchlisted - movies - data

const getWatchlistedMoviesData = async (req, res) => {
	const watchlistedMovies = await User.getWatchListed(req.query.id);
	const resu = JSON.parse(watchlistedMovies[0].watchlisted).watchlisted;
	const array = [];
	resu.map((item) => {
		array.push(item);
	});

	const result = await MovieModel.getMoviesByIds(array);
	res.status(StatusCodes.OK).json({ result });
};

module.exports = {
	getMovies,
	getGenres,
	getMoviesByGenre,
	getMoviesByQuery,
	getMovieInfo,
	getMoviesRecommendations,
	getFavoritedMoviesData,
	getWatchlistedMoviesData,
};
