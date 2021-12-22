const models = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Validator = require("fastest-validator");

// Function to create new Users
function signUp(req, res) {
	models.User.findOne({ where: { email: req.body.email } })
		.then((result) => {
			if (result) {
				res.status(403).json({
					message: "Email already exists!",
				});
			} else {
				bcrypt.genSalt(10, function (err, salt) {
					bcrypt.hash(req.body.password, salt, function (err, hash) {
						const rand = Math.floor(Math.random() * 999999999);
						const user = {
							username: req.body.username + rand,
							display_name: req.body.username,
							email: req.body.email,
							password: hash,
							is_admin: req.body.is_admin,
							desc: req.body.desc,
							city: req.body.city,
							from: req.body.from,
						};
						const schema = {
							username: {
								type: "string",
								optional: false,
								max: 255,
							},
							email: {
								type: "email",
								optional: false,
								max: 255,
							},
							password: { type: "string", optional: false, max: 255 },
							is_admin: { type: "boolean", default: false },
						};
						const v = new Validator();
						const validationResponse = v.validate(user, schema);
						if (validationResponse !== true) {
							return res.status(400).json({
								message: "Validation failed",
								error: validationResponse,
							});
						}
						models.User.create(user)
							.then((result) => {
								res.status(201).json({
									message: "User created successfully",
								});
							})
							.catch((error) => {
								res.status(500).json({
									message: "Something went wrong!",
								});
							});
					});
				});
			}
		})
		.catch((error) => {
			res.status(500).json({
				message: "Something went wrong!",
			});
		});
}

function login(req, res) {
	models.User.findOne({ where: { email: req.body.email } })
		.then((user) => {
			if (user === null) {
				res.status(401).json({
					message: "Invalid credentials",
				});
			} else {
				bcrypt.compare(
					req.body.password,
					user.password,
					function (err, result) {
						if (result) {
							jwt.sign(
								{
									email: user.email,
									userId: user.id,
								},
								process.env.SECRET_TOKEN,
								{
									expiresIn: process.env.JWT_EXPIRE,
								},
								function (err, token) {
									res.status(200).json({
										message: "Authentication successful!",
										token: token,
										user: user,
									});
									// const cookie = req.cookie.token;
									// if (cookie == undefined) {
									// 	res.cookie("token", token, { httpOnly: true });
									// 	return res.status(200).json({ message: "login success" });
									// }
									// console.log(cookie);
								}
							);
						} else {
							res.status(401).json({
								message: "Invalid credentials",
							});
						}
					}
				);
			}
		})
		.catch((error) => {
			res.status(500).json({
				message: "Something went wrong!",
			});
		});
}
// Update a User

function update(req, res) {
	const id = req.params.id;
	bcrypt.genSalt(10, function (err, salt) {
		bcrypt.hash(req.body.password, salt, function (err, hash) {
			const updatedUser = {
				username: req.body.username,
				display_name: req.body.display_name,
				email: req.body.email,
				password: hash,
				profile_picture: req.body.profile_picture,
				cover_picture: req.body.cover_picture,
				desc: req.body.desc,
				city: req.body.city,
				from: req.body.from,
				dept: req.body.dept,
				year: req.body.year,
			};
			const userId = req.userData.userId;

			models.User.findByPk(req.userData.userId)
				.then((result) => {
					if (result !== null && userId === req.userData.userId) {
						models.User.update(updatedUser, { where: { id: userId } })
							.then((result) => {
								if (result) {
									res.status(200).json({
										message: "Profile updated successfully",
										user: updatedUser,
									});
								} else {
									res.status(403).json({
										message: "You can only update your account!",
										error: error,
									});
								}
							})
							.catch((error) => {
								res.status(500).json({
									message: "Something went wrong!",
									error: error,
								});
							});
					} else {
						res.status(400).json({
							message: "Invalid request",
						});
					}
				})
				.catch((error) => {
					res.status(500).json({
						message: "Something went wrong",
						error: error,
					});
				});
		});
	});
}

// Delete User
function destroy(req, res) {
	const id = req.params.id;
	const userId = req.userData.userId;
	models.Comment.destroy({ where: { userId: userId } });
	models.Post.destroy({ where: { userId: userId } });
	models.User.destroy({ where: { id: id, id: userId } })
		.then((result) => {
			if (result) {
				res.status(200).json({
					message: "User deleted successfully",
				});
			} else {
				res.status(403).json({
					message: "You can only delete your account",
				});
			}
		})
		.catch((error) => {
			res.status(500).json({
				message: "Something went wrong",
				error: error,
			});
		});
}

// Get a user

function show(req, res) {
	const userId = req.query.userId;
	const username = req.query.username;
	try {
		if (username) {
			models.User.findOne({ where: { username: username } })
				.then((result) => {
					if (result) {
						res.status(200).json(result);
					} else {
						res.status(404).json({
							message: "User not found!",
						});
					}
				})
				.catch((error) => {
					res.status(500).json({
						message: "Something went wrong!",
					});
				});
		} else if (userId) {
			models.User.findByPk(userId)
				.then((result) => {
					if (result) {
						res.status(200).json(result);
					} else {
						res.status(404).json({
							message: "User not found!",
						});
					}
				})
				.catch((error) => {
					res.status(500).json({
						message: "Something went wrong!",
					});
				});
		}
	} catch (error) {
		res.status(500).json({
			message: "Something went wrong!",
		});
	}
}
// Get all Users

function showAll(req, res) {
	try {
		models.User.findAll()
			.then((result) => {
				if (result) {
					res.status(200).json(result);
				} else {
					res.status(404).json({
						message: "User not found!",
					});
				}
			})
			.catch((error) => {
				res.status(500).json({
					message: "Something went wrong!",
				});
			});
	} catch (error) {
		res.status(500).json({
			message: "Something went wrong!",
		});
	}
}

module.exports = {
	signUp: signUp,
	login: login,
	update: update,
	destroy: destroy,
	show: show,
	showAll: showAll,
};
