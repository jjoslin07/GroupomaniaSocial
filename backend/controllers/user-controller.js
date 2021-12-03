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
						const user = {
							firstName: req.body.firstName,
							lastName: req.body.lastName,
							email: req.body.email,
							password: hash,
							isAdmin: req.body.isAdmin,
							desc: req.body.desc,
							city: req.body.city,
							from: req.body.from,
						};
						const schema = {
							firstName: { type: "string", optional: false, max: 255 },
							lastName: { type: "string", optional: false, max: 255 },
							email: {
								type: "email",
								optional: false,
								max: 255,
							},
							password: { type: "string", optional: false, max: 255 },
							isAdmin: { type: "boolean", default: false },
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
							const token = jwt.sign(
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
									});
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
				name: req.body.name,
				email: req.body.email,
				password: hash,
				profilePicture: req.body.profilePicture,
				coverPicture: req.body.coverPicture,
				desc: req.body.desc,
				city: req.body.city,
				from: req.body.from,
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
	try {
		const id = req.params.id;
		models.User.findByPk(id)
			.then((result) => {
				if (result) {
					console.log(result);
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
// Get all Users

function showAll(req, res) {
	try {
		models.User.findAll()
			.then((result) => {
				if (result) {
					console.log(result);
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
// Follow User

function follow(req, res) {
	const follow = {
		userId: req.params.id,
		followerId: req.userData.userId,
	};
	models.User.findByPk(req.params.id)
		.then((result) => {
			if (result !== null && result.dataValues.id !== req.userData.userId) {
				models.Follow.create(follow)
					.then((result) => {
						res.status(201).json({
							message: "User followed successfully",
						});
					})
					.catch((error) => {
						res.status(400).json({
							message: "You already follow this user",
						});
					});
			} else {
				res.status(400).json({
					message: "You can't follow yourself",
					error: error,
				});
			}
		})
		.catch((error) => {
			res.status(404).json({
				message: "User unavailable",
			});
		});
}

// Unfollow User
function unfollow(req, res) {
	const id = req.params.id;
	const followerId = req.userData.userId;

	models.Follow.destroy({ where: { userId: id, followerId: followerId } })
		.then((result) => {
			if (result > 0) {
				res.status(200).json({
					message: "User unfollow successful",
				});
			} else {
				res.status(400).json({
					message: "You don't follow user",
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
// Get Followers

function getFollowers(req, res) {
	const id = req.params.id;
	try {
		models.Follow.findAll({ where: { userId: id } })
			.then((result) => {
				if (result.length > 0) {
					res.status(200).json(result);
				} else {
					res.status(404).json({
						message: "No Followers found!",
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

// Get Following

function getFollowing(req, res) {
	const id = req.params.id;
	try {
		models.Follow.findAll({ where: { followerId: id } })
			.then((result) => {
				if (result.length > 0) {
					res.status(200).json(result);
				} else {
					res.status(404).json({
						message: "Not Following anyone!",
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
	follow: follow,
	unfollow: unfollow,
	getFollowers: getFollowers,
	getFollowing: getFollowing,
};
