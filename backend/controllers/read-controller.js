const models = require("../models");

function read(req, res) {
	const read = {
		postId: req.params.id,
		userId: req.userData.userId,
	};

	models.Post.findByPk(read.postId)
		.then((result) => {
			if (result !== null) {
				models.Read.findOne({
					where: { postId: read.postId, userId: read.userId },
				})
					.then((result) => {
						if (result !== null) {
							models.Read.destroy({
								where: { postId: read.postId, userId: read.userId },
							})
								.then((result) => {
									if (result > 0) {
										res.status(200).json({
											message: "Post marked unread",
										});
									} else {
										res.status(400).json({
											message: "Post already marked unread",
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
							models.Read.create(read)
								.then((result) => {
									res.status(201).json({
										message: "Post marked read",
									});
								})
								.catch((error) => {
									res.status(400).json({
										message: "Post already marked read",
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

function status(req, res) {
	const postId = req.params.id;
	const userId = req.userData.userId;
	models.Read.findOne({ where: { postId: postId, userId: userId } })
		.then((result) => {
			if (result !== null) {
				console.log(result);
				res.status(200).json({
					Status: "✓",
				});
			} else {
				res.status(200).json({
					Status: "✉️",
				});
			}
		})
		.catch((error) => {
			res.status(404).json({
				error: error,
			});
		});
}

module.exports = {
	read: read,
	status: status,
};
