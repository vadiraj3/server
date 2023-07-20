const User = require('../model/User');
const { StatusCodes } = require('http-status-codes');
const BadRequestError = require('../errors/bad-request');
const UnauthenticatedError = require('../errors/unauthenticated');
const { array } = require('joi');

const register = async (req, res) => {
	const { firstname, lastname, email, password } = req.body;

	const favorites = JSON.stringify({ favorites: [] });
	const watchlisted = JSON.stringify({ watchlisted: [] });

	response = User.validateUser(req.body);
	req.body.favorites = favorites;
	req.body.watchlisted = watchlisted;
	if (response.error) {
		res.status(StatusCodes.BAD_REQUEST).json({ error: response.error });
	} else {
		const { userId, username } = await User.createUser(req.body);
		const token = User.createJWT(userId, username);
		res.status(StatusCodes.CREATED).json({ msg: 'Successs', token });
	}
};

const login = async (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		throw new BadRequestError('Please provide email and password');
	}
	const user = await User.loginUser(email);

	if (!user.length) {
		throw new UnauthenticatedError('Invalid Credentials');
	}

	const isPasswordCorrect = await User.comparePassword(
		password,
		user[0].password
	);
	if (!isPasswordCorrect) {
		throw new UnauthenticatedError('Invalid Credentials');
	}
	// compare password
	const token = User.createJWT(user[0].id, user[0].firstname);
	res
		.status(StatusCodes.OK)
		.json({ user: user[0].firstname, token, success: true });
};

const addToFavorites = async (req, res) => {
	const favoritedMovies = await User.getFavorites(req.body.user_id);
	const resu = JSON.parse(favoritedMovies[0].favorites).favorites;
	const array = [];
	resu.map((item) => {
		array.push(item);
	});

	!array.includes(req.body.movie_id)
		? array.push(req.body.movie_id)
		: array.splice(array.indexOf(req.body.movie_id), 1);
	console.log(req.body.movie_id);
	const favorites = { favorites: array };
	const result = await User.addToFavorites(
		req.body.user_id,
		JSON.stringify(favorites)
	);
};

const getFavorites = async (req, res) => {
	const favoritedMovies = await User.getFavorites(req.query.id);

	const result = JSON.parse(favoritedMovies[0].favorites).favorites;
	res.status(StatusCodes.OK).json({ result });
};

const addToWatchlisted = async (req, res) => {
	const watchlistedMovies = await User.getWatchListed(req.body.user_id);
	const resu = JSON.parse(watchlistedMovies[0].watchlisted).watchlisted;
	const array = [];
	resu.map((item) => {
		array.push(item);
	});

	!array.includes(req.body.movie_id)
		? array.push(req.body.movie_id)
		: array.splice(array.indexOf(req.body.movie_id), 1);

	const watchlisted = { watchlisted: array };
	const result = await User.addToWatchlisted(
		req.body.user_id,
		JSON.stringify(watchlisted)
	);
};

const getWatchListed = async (req, res) => {
	const watchlistedMovies = await User.getWatchListed(req.query.id);

	const result = JSON.parse(watchlistedMovies[0].watchlisted).watchlisted;
	res.status(StatusCodes.OK).json({ result });
};

module.exports = {
	register,
	login,
	addToFavorites,
	getFavorites,
	addToWatchlisted,
	getWatchListed,
};
