const connection = require('../db/dbConnect');

class Movie {
	constructor() {}

	getMovies(pageNum) {
		const skipPages = (pageNum - 1) * 24;
		const sql = `Select *,(SELECT COUNT(*) FROM movies) AS count from movies limit 24 offset ${skipPages}`;
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
	getGenres() {
		const sql = `Select * from genres`;
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

	getMoviesByGenre(id, page) {
		const skipPages = (page - 1) * 24;
		const sql = `Select movie_id from movies_genres where genre_id=? limit ${skipPages},24`;
		return new Promise((resolve, reject) => {
			connection.query(sql, [id], function (err, result) {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			});
		});
	}
	getMoviesByGenreType(type, page) {
		const skipPages = (page - 1) * 24;
		console.log(page);
		let sql = '';
		if (type == 'top_rated') {
			sql = `Select * from movies where vote_average>4.3`;
		} else if (type == 'upcoming') {
			sql = `Select * from movies where release_date>2021 `;
		} else {
			sql = `Select * from movies where id in(5,7,8,12,16,30,41,44,54,58,65,69,74,79,82,94,95,109,116,129,136,138,141,142,147,150,152,164,170,174,176) `;
		}
		return new Promise((resolve, reject) => {
			connection.query(sql, [type], function (err, result) {
				if (err) {
					console.log(err);
					reject(err);
				} else {
					resolve(result);
				}
			});
		});
	}

	getMoviesOfSameGenreByMovieId(id) {
		const sql = `select * from movies where id != ${id} and id in(Select movie_id from movies_genres where genre_id and genre_id in(select genre_id from movies_genres where movie_id=${id})) limit 12`;
		return new Promise((resolve, reject) => {
			connection.query(sql, [id], function (err, result) {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			});
		});
	}

	getMoviesByIds(idArray) {
		if (idArray.length > 0) {
			const sql = `Select * from movies where id in (${idArray})`;
			return new Promise((resolve, reject) => {
				connection.query(sql, function (err, result) {
					if (err) {
						console.log(err);
						reject(err);
					} else {
						resolve(result);
					}
				});
			});
		} else {
			return {};
		}
	}

	getMoviesByQuery(query) {
		const sql = `Select * from movies where title like '${query}%'`;
		return new Promise((resolve, reject) => {
			connection.query(sql, function (err, result) {
				if (err) {
					reject(err);
					console.log(err);
				} else {
					resolve(result);
				}
			});
		});
	}

	getMovieInfo(id) {
		const sql = `Select * from movies where id=?`;
		return new Promise((resolve, reject) => {
			connection.query(sql, [id], function (err, result) {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			});
		});
	}

	getGenreOfMovie(id) {
		const sql = `Select * from movies_genres where movie_id=?`;
		return new Promise((resolve, reject) => {
			connection.query(sql, [id], function (err, result) {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			});
		});
	}

	getMovieCast(id) {
		const sql = `Select * from movie_cast where movie_id=?`;
		return new Promise((resolve, reject) => {
			connection.query(sql, [id], function (err, result) {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			});
		});
	}

	getMovieCastInfo(id) {
		const sql = `Select * from actors where id in (Select actor_id from movie_cast where movie_id=${id})`;
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

	getGenreNames(id) {
		const sql = `Select * from genres where id in (Select genre_id from movies_genres where movie_id=${id})`;
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
}

module.exports = Movie;
