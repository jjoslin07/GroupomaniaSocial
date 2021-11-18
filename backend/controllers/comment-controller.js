const Validator = require("fastest-validator");
const models = require("../models");
/**
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
function save(req, res) {
	console.log(req.userData);
	console.log(req.params);

	const comment = {
		content: req.body.content,
		postId: req.params.id,
		userId: req.userData.userId,
	};

	const schema = {
		content: { type: "string", optional: false, max: "500" },
		postId: { type: "string", optional: false },
		userId: { type: "number", optional: false },
	};

	const v = new Validator();
	const validationResponse = v.validate(comment, schema);

	if (validationResponse !== true) {
		return res.status(400).json({
			message: "Validation failed",
			errors: validationResponse,
		});
	}

	models.Post.findByPk(req.params.id)
		.then((post) => {
			if (post === null) {
				res.status(404).json({
					message: "Post not found",
				});
			} else {
				models.Comment.create(comment)
					.then((result) => {
						res.status(201).json({
							message: "Comment created successfully",
							comment: result,
						});
					})
					.catch((error) => {
						res.status(500).json({
							message: "Something went wrong",
							error: error,
						});
					});
			}
		})
		.catch((err) => {
			res.status(500).json({
				message: "Something went wrong",
				error: err,
			});
		});
}
/**
 *
 * @param {*} req
 * @param {*} res
 */
function show(req, res) {
	const id = req.params.id;

	models.Comment.findByPk(id)
		.then((result) => {
			if (result) {
				res.status(200).json({
					comment: result,
				});
			} else {
				res.status(404).json({
					message: "Comment not found!",
				});
			}
		})
		.catch((error) => {
			res.status(500).json({
				message: "Something went wrong!",
			});
		});
}
/**
 *
 * @param {*} req
 * @param {*} res
 */
function showAll(req, res) {
	const postId = req.params.id;

	models.Comment.findAll({ where: { postId: postId } })
		.then((result) => {
			if (result.length > 0) {
				res.status(200).json({
					Comments: result,
				});
			} else {
				res.status(404).json({
					message: "No comments found!",
				});
			}
		})
		.catch((error) => {
			res.status(500).json({
				message: "Something went wrong!",
			});
		});
}
/**
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
function update(req, res) {
	const id = req.params.id;
	const updatedComment = {
		content: req.body.content,
	};

	const userId = req.userData.userId;

	const schema = {
		content: { type: "string", optional: false, max: "500" },
	};

	const v = new Validator();
	const validationResponse = v.validate(updatedComment, schema);

	if (validationResponse !== true) {
		return res.status(400).json({
			message: "Validation failed",
			errors: validationResponse,
		});
	}

	models.Comment.update(updatedComment, { where: { id: id, userId: userId } })
		.then((result) => {
			if (result > 0) {
				res.status(200).json({
					message: "Comment updated successfully",
					post: updatedComment,
				});
			} else {
				res.status(404).json({
					message: "Comment not found!",
				});
			}
		})
		.catch((error) => {
			res.status(404).json({
				message: "Nothing to see here",
				error: error,
			});
		});
}
/**
 *
 * @param {*} req
 * @param {*} res
 */
function destroy(req, res) {
	const id = req.params.id;
	const userId = req.userData.userId;

	models.Comment.destroy({ where: { id: id, userId: userId } })
		.then((result) => {
			res.status(200).json({
				message: "Comment deleted successfully",
			});
		})
		.catch((error) => {
			res.status(200).json({
				message: "Something went wrong",
				error: error,
			});
		});
}

module.exports = {
	save: save,
	showAll: showAll,
	show: show,
	update: update,
	destroy: destroy,
};
