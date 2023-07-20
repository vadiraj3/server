const connection = require('../db/dbConnect');

class Actor {
	constructor() {}

	getActorInfo(id) {
		const sql = 'select * from actors where id=?';
		return new Promise((resolve, reject) => {
			connection.query(sql, [id], (error, result) => {
				if (error) {
					reject(error);
				} else {
					resolve(result);
				}
			});
		});
	}

	getActorMovies(id) {
		const sql = `select * from movies where id in(select movie_id from movie_cast where actor_id=${id})`;
		return new Promise((resolve, reject) => {
			connection.query(sql, (err, result) => {
				if (err) {
					reject(err);
					console.log(err);
				} else {
					resolve(result);
				}
			});
		});
	}

	addActorInfo(firstname, lastname, gender, profile_pic, about, dob, imdb) {
		const sql =
			'insert into actors(firstname, lastname,gender,profile_pic,about,dob,imdb) values (?,?,?,?,?,?,?)';
		return new Promise((resolve, reject) => {
			connection.query(
				sql,
				[firstname, lastname, gender, profile_pic, about, dob, imdb],
				(err, result) => {
					if (err) {
						console.log(err);
						reject(err);
					} else {
						resolve(result);
					}
				}
			);
		});
	}
}

module.exports = Actor;
