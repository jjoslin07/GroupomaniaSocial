const models = require("../models");

function like(req, res) {
	const like = {
		postId: req.params.id,
		userId: req.userData.userId,
	};

	models.Post.findByPk(like.postId)
		.then((result) => {
			if (result !== null) {
				models.Reactions.findOne({
					where: { postId: like.postId, userId: like.userId },
				})
					.then((result) => {
						if (result !== null) {
							models.Reactions.destroy({
								where: { postId: like.postId, userId: like.userId },
							})
								.then((result) => {
									if (result > 0) {
										res.status(200).json({
											message: "Like removed successfully",
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
						} else {
							models.Reactions.create(like)
								.then((result) => {
									res.status(201).json({
										message: "Like created successfully",
									});
								})
								.catch((error) => {
									res.status(400).json({
										message: "You already reacted to this post",
									});
								});
						}
					})
					.catch((error) => {
						res.status(404).json({
							message: "Post unavailable",
						});
					});
			} else {
				res.status(404).json({
					message: "Post not found",
				});
			}
		})
		.catch((error) => {
			res.status(500).json({
				message: "Something went wrong",
			});
		});
}
function getReaction(req, res) {
	// Each post
	const postId = req.params.id;
	// Find all reactions for each post
	models.Reactions.findAll({ where: { postId: postId } })
		.then((result) => {
			res.status(200).json({
				Likes: result.length,
			});
		})
		.catch((error) => {
			res.status(404).json({
				message: "No reactions found for this post",
			});
		});
}

module.exports = {
	like: like,
	getReaction: getReaction,
};
