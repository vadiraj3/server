const express = require('express');
const app = express();
const bodyparser = require('body-parser');
require('express-async-errors');
const dbConnect = require('./db/dbConnect');
const cors = require('cors');
const userRouter = require('./routes/User');
const movieRouter = require('./routes/movie');
const actorRouter = require('./routes/actor');
const movieApiRouter = require('./routes/movieApi');
const actorApiRouter = require('./routes/actorApi');
require('express-async-errors');
const helmet = require('helmet');

app.use(express.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(helmet());
app.use(express.json());
app.use(cors());

app.use('/kfi-api/v1/user', userRouter);
app.use('/kfi-api/v1/movies', movieRouter);
app.use('/kfi-api/v1/actors', actorRouter);
app.use('/kfi-api/v1/add-movie-data', movieApiRouter);
app.use('/kfi-api/v1/add-actor-data', actorApiRouter);

const PORT = process.env.PORT || 3000;

const start = () => {
	try {
		dbConnect.getConnection((err, connection) => {
			if (err) {
				console.error('Error connecting to the database:', err);
				// Handle connection error
			} else {
				console.log('Connected to the database!');
				app.listen(PORT, () => {
					console.log('Server running and Database connected Successfully');
				});
				connection.release();
			}
		});
	} catch (error) {
		console.log(error.message);
	}
};

start();
