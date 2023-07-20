const Actor = require('../model/Actor');
const ActorModel = new Actor();
const { StatusCodes } = require('http-status-codes');
const BadRequestError = require('../errors/bad-request');

const getActorInfo = async (req, res) => {
	const result = await ActorModel.getActorInfo(req.query.id);
	res.status(StatusCodes.OK).json({ result });
};

const getActorMovies = async (req, res) => {
	const result = await ActorModel.getActorMovies(req.query.id);
	res.status(StatusCodes.OK).json({ result });
};

//actor APi CALL for updating actor info about profile pic dob imdb and about
const addActorInfo = async (req, res) => {
	const { firstname, lastname, gender, profile_pic, about, dob, imdb } =
		req.body;
	if (
		!profile_pic &&
		!about &&
		!dob &&
		!imdb &&
		!firstname &&
		!lastname &&
		!gender
	) {
		throw new BadRequestError(
			'Please provide all details, namely profile pic , about, dob and imdb and actor Id'
		);
	}
	const result = await ActorModel.addActorInfo(
		firstname,
		lastname,
		gender,
		profile_pic,
		about,
		dob,
		imdb
	);
	res.status(StatusCodes.OK).json({ result });
};

module.exports = { getActorInfo, getActorMovies, addActorInfo };
