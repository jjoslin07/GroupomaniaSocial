// Import fastest validator
const Validator = require("fastest-validator");
// Import models
const models = require("../models");
/**
 * Saves a comment made by current user to database.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns
 */
function save(req, res) {
	// Comment Object
	const comment = {
		content: req.body.content,
		postId: req.params.id,
		userId: req.userData.userId,
	};
	//	Schema object for validation
	const schema = {
		content: { type: "string", optional: false },
	};
	// const v for new Validator object
	const v = new Validator();
	// validate comment against schema
	const validationResponse = v.validate(comment, schema);
	// If validation response not equal to true return message and error
	if (validationResponse !== true) {
		return res.status(400).json({
			message: "Validation failed",
			errors: validationResponse,
		});
	}
	// If validation true find post by id
	models.Post.findByPk(req.params.id)
		.then((post) => {
			// If no post found return message
			if (post === null) {
				res.status(404).json({
					message: "Post not found",
				});
			} else {
				// If post found create new comment
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
 * Shows one comment
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
function show(req, res) {
	// id in parameter
	const id = req.params.id;
	// Look for comment by id
	models.Comment.findByPk(id)
		.then((result) => {
			// If found return comment in response
			if (result) {
				res.status(200).json({
					comment: result,
				});
			} else {
				// If not found return 404 error and message
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
 * Shows ALL comments
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
function showAll(req, res) {
	// id of post
	const postId = req.params.id;
	// Look for any comments in db where post id matches
	models.Comment.findAll({ where: { postId: postId } })
		.then((result) => {
			if (result.length > 0) {
				// If result > 0 send response
				res.status(200).json({
					Comments: result,
				});
			} else {
				// Send 404 error
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
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns
 */
function update(req, res) {
	// id of post
	const id = req.params.id;
	// Updated comment object
	const updatedComment = {
		id: req.params.id,
		content: req.body.content,
		userId: req.userData.userId,
	};
	// Current user
	const userId = req.userData.userId;
	// Comment content validation
	const schema = {
		content: { type: "string", optional: false },
	};
	// new Validator
	const v = new Validator();
	// Validation updated comment against schema
	const validationResponse = v.validate(updatedComment, schema);
	// If validation not equal to true send Validation failed
	if (validationResponse !== true) {
		return res.status(400).json({
			message: "Validation failed",
			errors: validationResponse,
		});
	}
	// If equal to true update comment where the id and userId match in db
	models.Comment.update(updatedComment, { where: { id: id, userId: userId } })
		.then((result) => {
			if (result > 0) {
				// Send updated comment
				res.status(200).json({
					message: "Comment updated successfully",
					comment: updatedComment,
				});
			} else {
				// Send 404 comment not found
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
 * Deletes one comment
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
function destroy(req, res) {
	// Comment id
	const id = req.params.id;
	// Current user
	const userId = req.userData.userId;
	// Destroy comment where id and current user match
	models.Comment.destroy({ where: { id: id, userId: userId } })
		.then((result) => {
			if (result > 0) {
				res.status(200).json({
					message: "Comment deleted successfully",
				});
			} else {
				res.status(404).json({
					message: "Comment not found!",
				});
			}
		})
		.catch((error) => {
			res.status(200).json({
				message: "Something went wrong",
				error: error,
			});
		});
}
// Exports all functions
module.exports = {
	save: save,
	showAll: showAll,
	show: show,
	update: update,
	destroy: destroy,
};
