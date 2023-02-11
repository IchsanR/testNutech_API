const db = require("../config/db");

const userModel = {
	// get all user (For testing only)
	allUser: () => {
		return new Promise((resolve, reject) => {
			db.query(`SELECT * FROM users`)
				.then((results) => {
					resolve(results);
				})
				.catch((error) => {
					reject(error);
				});
		});
	},

	selectDetail: (id_user) => {
		return new Promise((resolve, reject) => {
			db.query(`SELECT * FROM users WHERE id_user = '${id_user}'`)
				.then((results) => {
					resolve(results);
				})
				.catch((error) => {
					reject(error);
				});
		});
	},

	selectUsername: (username) => {
		return new Promise((resolve, reject) => {
			db.query(`SELECT * FROM users WHERE username = '${username}'`)
				.then((results) => {
					resolve(results);
				})
				.catch((error) => {
					reject(error);
				});
		});
	},

	registerUser: (data) => {
		return new Promise((resolve, reject) => {
			db.query(
				`INSERT INTO users (id_user, name, username, password) VALUES ($1, $2, $3, $4)`,
				[data.id_user, data.name, data.username, data.password]
			)
				.then((results) => {
					resolve(results);
				})
				.catch((error) => {
					reject(error);
				});
		});
	},
};

module.exports = userModel;
