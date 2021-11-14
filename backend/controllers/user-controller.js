const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Validator = require("fastest-validator");
require("dotenv").config();
// Sign the user up with a unique id using a unique email and hash's the password to store in database.
exports.signup = (req, res, next) => {
	bcrypt.hash(req.body.password, 10).then((hash) => {
		const user = new User({
			email: req.body.email,
			password: hash,
		});
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

		// Save user to database.
		user
			.save()
			.then(() => {
				res.status(201).json({
					message: "User added successfully!",
				});
			})
			.catch((error) => {
				return res.status(401).json({
					error: error,
					message: "Email not valid or is already in use, please try again!",
				});
			});
	});
};

// Searches for user in the database and if found compares password with bcrypt hash and logs user in.
exports.login = (req, res, next) => {
	User.findOne({
		email: req.body.email,
	})
		.then((user) => {
			if (!user) {
				return res.status(401).json({
					error: new Error("User not found!"),
				});
			}
			// Compare password hash's to login user in.
			bcrypt
				.compare(req.body.password, user.password)
				.then((valid) => {
					if (!valid) {
						return res.status(401).json({
							error: new Error("Incorrect password!"),
						});
					}
					// Use Json Web Token to keep the user signed in (Gives unique token that expires in 24 hours.)
					const token = jwt.sign(
						{
							userId: user._id,
						},
						process.env.SECRET_TOKEN,
						{
							expiresIn: "24h",
						}
					);
					res.status(200).json({
						userId: user._id,
						token: token,
					});
				})
				.catch((error) => {
					res.status(500).json({
						error: error,
					});
				});
		})
		.catch((error) => {
			res.status(500).json({
				error: error,
			});
		});
};

// Update user
exports.updateUser = async (req, res) => {
	if (req.body.userId === req.params.id || req.body.isAdmin) {
		// Update password
		if (req.body.password) {
			try {
				const salt = await bcrypt.genSalt(10);
				req.body.password = await bcrypt.hash(req.body.password, salt);
			} catch (error) {
				return res.status(500).json(error);
			}
		}
		try {
			const user = await User.findByIdAndUpdate(req.params.id, {
				$set: req.body,
			});
			res.status(200).json("Account has been updated");
		} catch (error) {
			return res.status(500).json(error);
		}
	} else {
		return res.status(403).json("You can only update your account");
	}
};
// Delete user
exports.deleteUser = async (req, res) => {
	if (req.body.userId === req.params.id || req.body.isAdmin) {
		try {
			const user = await User.findByIdAndDelete(req.params.id);
			res.status(200).json("Account has been deleted");
		} catch (error) {
			return res.status(500).json(error);
		}
	} else {
		return res.status(403).json("You can only delete your account");
	}
};
// Get a user
exports.getUser = async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		const { password, updatedAt, ...other } = user._doc;
		res.status(200).json(other);
	} catch (error) {
		res.status(500).json(error);
	}
};
// Follow a user

exports.followUser = async (req, res) => {
	if (req.body.userId !== req.params.id) {
		try {
			const user = await User.findById(req.params.id);
			const currentUser = await User.findById(req.body.userId);
			if (!user.followers.includes(req.body.userId)) {
				await user.updateOne({
					$push: {
						followers: req.body.userId,
					},
				});
				await currentUser.updateOne({
					$push: {
						following: req.params.id,
					},
				});
				res.status(200).json("User has been followed");
			} else {
				res.status(403).json("You already follow this user");
			}
		} catch (error) {
			res.status(500).json(error);
		}
	} else {
		res.status(403).json("You can't follow yourself");
	}
};

// Unfollow a user
exports.unfollowUser = async (req, res) => {
	if (req.body.userId !== req.params.id) {
		try {
			const user = await User.findById(req.params.id);
			const currentUser = await User.findById(req.body.userId);
			if (user.followers.includes(req.body.userId)) {
				await user.updateOne({
					$pull: {
						followers: req.body.userId,
					},
				});
				await currentUser.updateOne({
					$pull: {
						following: req.params.id,
					},
				});
				res.status(200).json("User has been unfollowed");
			} else {
				res.status(403).json("You are not following this user");
			}
		} catch (error) {
			res.status(500).json(error);
		}
	} else {
		res.status(403).json("You can't unfollow yourself");
	}
};
