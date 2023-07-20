require('dotenv').config();
const mysql = require('mysql2');

const pool = mysql.createPool({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
	port: process.env.DB_PORT,
	connectionLimit: 10, // Maximum number of connections in the pool
	waitForConnections: true, // Wait for a free connection if no connections are available
});

module.exports = pool;
