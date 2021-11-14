const models = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Validator = require("fastest-validator");

// Function to create new Users
function signUp(req, res) {
	models.User.findOne({ where: { email: req.body.email } })
		.then((result) => {
			if (result) {
				res.status(409).json({
					message: "Email already exists!",
				});
			} else {
				bcrypt.genSalt(10, function (err, salt) {
					bcrypt.hash(req.body.password, salt, function (err, hash) {
						const user = {
							name: req.body.name,
							email: req.body.email,
							password: hash,
						};
						const schema = {
							name: { type: "string", optional: false, min: 3, max: 255 },
							email: {
								type: "email",
								optional: false,
								max: 255,
							},
							password: { type: "string", optional: false, max: 255 },
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
						erorr: error,
					});
				});
		});
	});
}

module.exports = {
	signUp: signUp,
	login: login,
	update: update,
};
