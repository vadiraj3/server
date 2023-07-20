const connection = require('../db/dbConnect');

class MovieApi {
	constructor() {}

	addTrailerandImdb(trailer_path, imdb_link, movie_id) {
		const sql = `update movies set trailer=?, imdb=? where id=?`;
		return new Promise((resolve, reject) => {
			connection.query(
				sql,
				[trailer_path, imdb_link, movie_id],
				(err, result) => {
					if (err) {
						reject(err);
					} else {
						resolve(result);
					}
				}
			);
		});
	}

	addMovieCast(movie_id, actor_id, role) {
		const sql =
			'insert into movie_cast (movie_id, actor_id, role) values(?,?,?)';
		return new Promise((resolve, reject) => {
			connection.query(sql, [movie_id, actor_id, role], (err, result) => {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			});
		});
	}

	addMovieGenre(movie_id, genre_id) {
		const sql = 'insert into movies_genres(movie_id, genre_id) values (?,?)';
		return new Promise((resolve, reject) => {
			connection.query(sql, [movie_id, genre_id], (err, result) => {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			});
		});
	}

	addMovie(inputs) {
		const {
			title,
			overview,
			poster_path,
			vote_count,
			vote_average,
			length,
			release_date,
			trailer,
			imdb,
		} = inputs;
		const sql =
			'insert into movies (title,overview,poster_path,vote_count,vote_average,length,release_date,trailer,imdb) values(?,?,?,?,?,?,?,?,?)';
		return new Promise((resolve, reject) => {
			connection.query(
				sql,
				[
					title,
					overview,
					poster_path,
					vote_count,
					vote_average,
					length,
					release_date,
					trailer,
					imdb,
				],
				(err, result) => {
					if (err) {
						reject(err);
					} else {
						resolve(result);
					}
				}
			);
		});
	}
}

module.exports = new MovieApi();
