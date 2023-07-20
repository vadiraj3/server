const MovieApi = require('../model/MovieApi');
const BadRequestError = require('../errors/bad-request');

const { StatusCodes } = require('http-status-codes');

const addTrailerandImdb = async (req, res) => {
	const { trailer_path, imdb_link, movie_id } = req.body;
	if (!trailer_path && !imdb_link) {
		throw new BadRequestError(
			'You need to provide both trailer path and imdb link'
		);
	}

	const result = await MovieApi.addTrailerandImdb(
		trailer_path,
		imdb_link,
		movie_id
	);
	res.status(StatusCodes.OK).json({ result });
};

//movie_cast info
const movieCastInfo = async (req, res) => {
	const { movie_id, actor_id, role } = req.body;
	if (!movie_id && !actor_id && !role) {
		throw new BadRequestError(
			'You need to provide all values , which are , movie_id, actor_id and their role'
		);
	}

	const result = await MovieApi.addMovieCast(movie_id, actor_id, role);
	res.status(StatusCodes.OK).json({ result });
};

const addMovieGenre = async (req, res) => {
	const { movie_id, genre_id } = req.body;
	if (!movie_id && !genre_id) {
		throw new BadRequestError('You should provide both movie id and genre id');
	}

	const result = await MovieApi.addMovieGenre(movie_id, genre_id);
	res.status(StatusCodes.OK).json({ result });
};

const addMovie = async (req, res) => {
	const {
		title,
		overview,
		poster_path,
		vote_average,
		vote_count,
		length,
		release_date,
		trailer,
		imdb,
	} = req.body;
	if (
		!title &&
		!overview &&
		!poster_path &&
		!vote_average &&
		!vote_count &&
		!length &&
		!release_date &&
		!trailer &&
		!imdb
	) {
		throw new BadRequestError('You must provide all the information ');
	}

	const result = await MovieApi.addMovie(req.body);
	res.status(StatusCodes.OK).json({ result });
};

module.exports = { addTrailerandImdb, movieCastInfo, addMovieGenre, addMovie };
