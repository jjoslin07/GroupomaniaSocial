const models = require("../models");

// Function to Like Post

function like(req, res) {
	const like = {
		postId: req.params.id,
		userId: req.userData.userId,
		isLiked: true,
		isLoved: false,
		isFunny: false,
	};
	models.Post.findByPk(req.params.id)
		.then((result) => {
			if (result !== null) {
				models.Reactions.create(like)
					.then((result) => {
						res.status(201).json({
							message: "Like created successfully",
							like: result,
						});
					})
					.catch((error) => {
						res.status(400).json({
							message: "You already liked this post",
							error: error.message,
						});
					});
			} else {
				res.status(500).json({
					message: "Something went wrong",
					error: error,
				});
			}
		})
		.catch((error) => {
			res.status(404).json({
				message: "Nothing to see here",
			});
		});
}

// Function to Unlike Post

function unlike(req, res) {
	const id = req.params.id;
	const userId = req.userData.userId;
	try {
		models.Reactions.destroy({ where: { postId: id, userId: userId } })
			.then((result) => {
				res.status(200).json({
					message: "Post unliked successfully",
					unlike: result,
				});
			})
			.catch((error) => {
				res.status(403).json({
					message: "Post already unliked",
					error: error,
				});
			});
	} catch (error) {
		res.status(500).json({
			message: "Something went wrong",
		});
	}
}

// Function to Love Post

function love(req, res) {
	const love = {
		postId: req.params.id,
		userId: req.userData.userId,
		isLoved: true,
		isLiked: false,
		isFunny: false,
	};
	models.Post.findByPk(req.params.id)
		.then((result) => {
			if (result !== null) {
				models.Reactions.create(love)
					.then((result) => {
						res.status(201).json({
							message: "Love created successfully",
							like: result,
						});
					})
					.catch((error) => {
						res.status(400).json({
							message: "You already loved this post",
							error: error.message,
						});
					});
			} else {
				res.status(500).json({
					message: "Something went wrong",
					error: error,
				});
			}
		})
		.catch((error) => {
			res.status(404).json({
				message: "Nothing to see here",
			});
		});
}

// Function to Unlove Post
function unlove(req, res) {
	const id = req.params.id;
	const userId = req.userData.userId;
	try {
		models.Reactions.destroy({ where: { postId: id, userId: userId } })
			.then((result) => {
				res.status(200).json({
					message: "Post unloved successfully",
					unlove: result,
				});
			})
			.catch((error) => {
				res.status(403).json({
					message: "Post already unloved",
					error: error,
				});
			});
	} catch (error) {
		res.status(500).json({
			message: "Something went wrong",
		});
	}
}

// Function to Lol post

function funny(req, res) {
	const funny = {
		postId: req.params.id,
		userId: req.userData.userId,
		isLoved: false,
		isLiked: false,
		isFunny: true,
	};
	models.Post.findByPk(req.params.id)
		.then((result) => {
			if (result !== null) {
				models.Reactions.create(funny)
					.then((result) => {
						res.status(201).json({
							message: "Lol created successfully",
							funny: result,
						});
					})
					.catch((error) => {
						res.status(400).json({
							message: "You already Lol this post",
							error: error.message,
						});
					});
			} else {
				res.status(500).json({
					message: "Something went wrong",
					error: error,
				});
			}
		})
		.catch((error) => {
			res.status(404).json({
				message: "Nothing to see here",
			});
		});
}
// Function to Remove Lol post
function unfunny(req, res) {
	const id = req.params.id;
	const userId = req.userData.userId;
	try {
		models.Reactions.destroy({ where: { postId: id, userId: userId } })
			.then((result) => {
				res.status(200).json({
					message: "Lol removed successfully",
					unFunny: result,
				});
			})
			.catch((error) => {
				res.status(403).json({
					message: "Lol alredy removed",
					error: error,
				});
			});
	} catch (error) {
		res.status(500).json({
			message: "Something went wrong",
		});
	}
}

module.exports = {
	like: like,
	unlike: unlike,
	love: love,
	unlove: unlove,
	funny: funny,
	unfunny: unfunny,
};
