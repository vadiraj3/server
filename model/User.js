const connection = require('../db/dbConnect');

const Joi = require('joi');
// const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

class User {
	constructor() {}

	createUser = async (user) => {
		const { firstname, lastname, email, password, favorites, watchlisted } =
			user;
		console.log('i');
		console.log(firstname, lastname, email, password, favorites, watchlisted);
		const hashedPassword = await this.encryptPassword(password);
		const sql = `INSERT INTO users (firstname,lastname,email,password,favorites,watchlisted) VALUES (?,?,?,?,?,?)`;
		return new Promise((resolve, reject) => {
			connection.query(
				sql,
				[firstname, lastname, email, hashedPassword, favorites, watchlisted],
				function (err, result) {
					if (err) {
						console.log(err);
						reject(err);
					} else {
						const user = { userId: result.insertId, username: firstname };
						resolve(user);
					}
				}
			);
		});
	};
	//encrypt password
	encryptPassword = async (password) => {
		// const salt = await bcrypt.genSalt(10);
		// const hashed = await bcrypt.hash(password, salt);

		return password;
	};

	//User-defined function to validate the user
	validateUser(user) {
		const JoiSchema = Joi.object({
			firstname: Joi.string().min(3).max(30).required(),
			lastname: Joi.string().min(3).max(30).required(),

			email: Joi.string().email().min(5).max(50).required(),

			password: Joi.string().min(5).required(),
		}).options({ abortEarly: false });

		return JoiSchema.validate(user);
	}

	loginUser(email) {
		const sql = `SELECT * FROM users WHERE email = "${email}"`;
		return new Promise((resolve, reject) => {
			connection.query(sql, function (err, result) {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			});
		});
	}
	getFavorites(userId) {
		const sql = `select favorites from users where id=${userId}`;
		return new Promise((resolve, reject) => {
			connection.query(sql, (err, result) => {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			});
		});
	}

	addToFavorites(userId, movieId) {
		console.log(movieId);
		const sql = `update users set favorites=? where id=${userId}`;

		return new Promise((resolve, reject) => {
			connection.query(sql, [movieId], (err, result) => {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			});
		});
	}

	getWatchListed(userId) {
		const sql = `select watchlisted from users where id=${userId}`;
		return new Promise((resolve, reject) => {
			connection.query(sql, (err, result) => {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			});
		});
	}

	addToWatchlisted(userId, movieId) {
		console.log(movieId);
		const sql = `update users set watchlisted=? where id=${userId}`;

		return new Promise((resolve, reject) => {
			connection.query(sql, [movieId], (err, result) => {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			});
		});
	}

	comparePassword = async (userPassword, dbPassword) => {
		// const isMatch = await bcrypt.compare(userPassword, dbPassword);
		return true;
	};

	createJWT = function (userId, username) {
		return jwt.sign(
			{ userId: userId, name: username, loggedIn: true },
			process.env.JWT_SECRET
		);
	};
}

module.exports = new User();
