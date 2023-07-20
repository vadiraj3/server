const jwt = require('jsonwebtoken');
const UnauthenticatedError = require('../errors/unauthenticated');

const auth = async (req, res, next) => {
	// check header
	const authHeader = req.headers.authorization;
	if (!authHeader || !authHeader.startsWith('Bearer')) {
		console.log(req.headers);
		throw new UnauthenticatedError('Authentication invalid');
	}

	const token = authHeader.split(' ')[1];

	try {
		const payload = jwt.verify(token, process.env.JWT_SECRET);
		// attach the user to the job routes
		console.log(payload);

		req.user = { userId: payload.userId, name: payload.name };
		next();
	} catch (error) {
		console.log('error coming');
		throw new UnauthenticatedError('Authentication invalid');
	}
};

module.exports = auth;
