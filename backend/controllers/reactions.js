const models = require("../models");

// Function to Like Posts
/**
 *
 * @param {*} req
 * @param {*} res
 */
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
						console.log(result.dataValues.isLiked);
						res.status(201).json({
							message: "LIKE created successfully",
						});
					})
					.catch((error) => {
						res.status(400).json({
							message: "You already reacted this post",
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
				message: "Post unavailable",
			});
		});
}

// Function to Unlike Post
/**
 *
 * @param {*} req
 * @param {*} res
 */
function unlike(req, res) {
	const id = req.params.id;
	const userId = req.userData.userId;

	models.Reactions.destroy({ where: { postId: id, userId: userId } })
		.then((result) => {
			if (result > 0) {
				res.status(200).json({
					message: "Reaction removed successfully",
				});
			} else {
				res.status(400).json({
					message: "You already removed your LIKE",
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
							message: "LOVE created successfully",
						});
					})
					.catch((error) => {
						res.status(400).json({
							message: "You already reacted this post",
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
				message: "Post unavailable",
			});
		});
}

// Function to Unlove Post
function unlove(req, res) {
	const id = req.params.id;
	const userId = req.userData.userId;

	models.Reactions.destroy({ where: { postId: id, userId: userId } })
		.then((result) => {
			if (result > 0) {
				res.status(200).json({
					message: "Reaction removed successfully",
				});
			} else {
				res.status(400).json({
					message: "You already removed your LOVE",
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
							message: "LOL created successfully",
						});
					})
					.catch((error) => {
						res.status(400).json({
							message: "You already reacted to this post",
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
				message: "Post unavailable",
			});
		});
}
// Function to Remove Lol post
function unfunny(req, res) {
	const id = req.params.id;
	const userId = req.userData.userId;

	models.Reactions.destroy({ where: { postId: id, userId: userId } })
		.then((result) => {
			if (result > 0) {
				res.status(200).json({
					message: "Reaction removed successfully",
				});
			} else {
				res.status(400).json({
					message: "You already removed your LOL",
				});
			}
		})
		.catch((error) => {
			res.status(500).json({
				message: "Something went wrong",
			});
		});
}

// Function to get Reactions and set them to Post
function getReaction(req, res) {
	const postId = req.params.id;
	var likeCount = 0;
	let loveCount = 0;
	let funnyCount = 0;
	// Find all posts that have a reaction
	models.Reactions.findAll({
		where: { postId: postId, hasReaction: true },
	})
		.then((result) => {
			if (result.length > 0) {
				// Count likes
				for (i = 0; i < result.length; i++) {
					if (result[i].isLiked === true) {
						likeCount++;
					}
				}
				// Count Loves
				for (k = 0; k < result.length; k++) {
					if (result[k].isLoved === true) {
						loveCount++;
					}
				}
				// Count funny
				for (j = 0; j < result.length; j++) {
					if (result[j].isFunny === true) {
						funnyCount++;
					}
				}
				res.status(200).json({
					message: "Here are the reactions",
					Likes: likeCount,
					Loves: loveCount,
					Funny: funnyCount,
				});

				// Update the Post Table with likes, loves and funny count
				models.Post.update(
					{ likes: likeCount, loves: loveCount, funny: funnyCount },
					{
						where: { id: postId },
					}
				);
			} else {
				res.status(404).json({
					message: "No reaction's on this post",
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

module.exports = {
	like: like,
	unlike: unlike,
	love: love,
	unlove: unlove,
	funny: funny,
	unfunny: unfunny,
	getReaction: getReaction,
};
