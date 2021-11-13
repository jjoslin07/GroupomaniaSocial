const mysql = require('mysql2');
require('dotenv').config();

module.exports = mysql.createConnection({
	host: 'localhost',
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	pool:{
		max:5,
		min:0,
		acquire: 30000,
		idle: 10000
	}
});
console.log("Successully connected to Database");