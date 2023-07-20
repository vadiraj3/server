const CustomApiError = require('./custom-api-error');
const { StatusCodes } = require('http-status-codes');

class BadRequestError extends CustomApiError {
	constructor(message, statusCode) {
		super(message);
		this.statusCode = StatusCodes.BAD_REQUEST;
	}
}

module.exports = BadRequestError;
