const models = require("../models");

// Function to Like Post

function like(req, res) {
	const like = {
		postId: req.params.id,
		userId: req.userData.userId,
		isLiked: true,
		isLoved: false,
		isFunny: false,
		hasReaction: true,
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
		hasReaction: true,
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
		hasReaction: true,
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

// Function to get Reactions
function getReaction(req, res) {
	const postId = req.params.id;
	// Find all posts that have a reaction
	models.Reactions.findAll({
		where: { postId: postId, hasReaction: true },
	})
		.then((result) => {
			if (result !== null) {
				res.status(200).json({
					message: "Here are the reactions",
					posts: result,
				});
				let likeCount = 0;
				let loveCount = 0;
				let funnyCount = 0;
				// Count likes
				for (i = 0; i < result.length; i++) {
					if (result[i].isLiked === true) {
						likeCount++;
					}
				}
				console.log("Like :" + likeCount);
				// Count Loves
				for (k = 0; k < result.length; k++) {
					if (result[k].isLoved === true) {
						loveCount++;
					}
				}
				console.log("Love: " + loveCount);
				// Count funny
				for (j = 0; j < result.length; j++) {
					if (result[j].isFunny === true) {
						funnyCount++;
					}
				}
				console.log("Funny :" + funnyCount);
			} else {
				res.status(404).json({
					message: "Nothing to see here",
				});
			}
		})
		.catch((error) => {
			error;
		});
}

module.exports = {
	like: like,
	unlike: unlike,
	love: love,
	unlove: unlove,
	funny: funny,
	unfunny: unfunny,
	getReaction: getReaction,
};
