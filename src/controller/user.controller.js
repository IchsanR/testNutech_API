const userModel = require("../model/user.model");
const { success, failed } = require("../helper/file.response");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const jwtToken = require("../helper/generateJWT");

const userController = {
	allUser: (req, res) => {
		userModel
			.allUser()
			.then((response) => {
				response.rows.map((items) => {
					delete items.password;
				});
				success(res, response.rows, "success", "get all user success");
			})
			.catch((error) => {
				failed(res, error.message, "failed", "get all user failed");
			});
	},

	userDetail: (req, res) => {
		const id_user = req.params.id_user;

		userModel
			.selectDetail(id_user)
			.then((response) => {
				delete response.rows[0].password;
				success(res, response.rows, "success", "get user success");
			})
			.catch((error) => {
				failed(res, error.message, "failed", "get user failed");
			});
	},

	registerUser: (req, res) => {
		const { name, username, password } = req.body;
		const id_user = uuidv4();
		bcrypt.hash(password, 10, (error, hash) => {
			if (error) {
				failed(res, error.message, "failed", "failed hash password");
			}

			const data = {
				name,
				id_user,
				username,
				password: hash,
			};

			userModel
				.selectUsername(username)
				.then((response) => {
					if (response.rowCount === 0) {
						userModel
							.registerUser(data)
							.then((response) => {
								success(res, response.rows, "success", "register success");
							})
							.catch((error) => {
								failed(res, error.message, "failed", "register failed");
							});
					} else {
						failed(res, null, "failed", "username has been registered");
					}
				})
				.catch((error) => {
					failed(res, error.message, "failed", "internal server error");
				});
		});
	},

	loginUser: (req, res) => {
		const { username, password } = req.body;
		userModel
			.selectUsername(username)
			.then((response) => {
				const users = response.rows[0];

				if (response.rowCount > 0) {
					bcrypt.compare(password, users.password).then(async (response) => {
						if (response) {
							const token = await jwtToken({
								id_user: users.id_user,
								username: users.username,
							});

							delete users.password;

							success(res, { token, data: users }, "success", "login success");
						} else {
							failed(
								res,
								null,
								"failed",
								"Check your username or password again"
							);
						}
					});
				} else {
					failed(res, null, "failed", "Check your username or password again");
				}
			})
			.catch((error) => {
				failed(res, error.message, "failed", "internal server error");
			});
	},
};

module.exports = userController;
