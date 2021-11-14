const { restart } = require("nodemon");
// Import Validator class
const Validator = require("fastest-validator");
// Import models
const models = require("../models");

// Function to create a new Post
function save(req, res) {
	const post = {
		title: req.body.title,
		content: req.body.content,
		imageUrl: req.body.imageUrl,
		categoryId: req.body.categoryId,
		userId: req.userData.userId,
	};

	// Define validation Schema
	const schema = {
		title: { type: "string", optional: false, max: "100" },
		content: { type: "string", optional: false, max: "500" },
		categoryId: { type: "number", optional: false },
	};
	// Create instance of Validator class
	const v = new Validator();
	// Use validate method on post using schema
	const validationResponse = v.validate(post, schema);
	// Check if validation response is false and return error
	if (validationResponse !== true) {
		return res.status(400).json({
			message: "Validation failed",
			error: validationResponse,
		});
	}
	models.Category.findByPk(req.body.categoryId).then((result) => {
		if (result !== null) {
			// Create new Post and save to database
			models.Post.create(post)
				.then((result) => {
					res.status(201).json({
						message: "Post created successfully",
						post: result,
					});
				})
				.catch((error) => {
					res.status(500).json({
						message: "Something went wrong",
						error: error,
					});
				});
		} else {
			res.status(400).json({
				message: "Invalid Category ID",
			});
		}
	});
}

// Function to get an individual Post
function show(req, res) {
	const id = req.params.id;

	models.Post.findByPk(id)
		.then((result) => {
			if (result) {
				res.status(200).json(result);
			} else {
				res.status(404).json({
					message: "Post not found!",
				});
			}
		})
		.catch((error) => {
			res.status(500).json({
				message: "Something went wrong!",
			});
		});
}

// Function to get all Posts

function index(req, res) {
	models.Post.findAll()
		.then((result) => {
			res.status(200).json(result);
		})
		.catch((error) => {
			res.status(500).json({
				message: "Something went wrong!",
			});
		});
}

// Function to update Post

function update(req, res) {
	const id = req.params.id;
	const updatedPost = {
		title: req.body.title,
		content: req.body.content,
		imageUrl: req.body.imageUrl,
		categoryId: req.body.categoryId,
	};

	const userId = req.userData.userId;
	// Define validation Schema
	const schema = {
		title: { type: "string", optional: false, max: "100" },
		content: { type: "string", optional: false, max: "500" },
		categoryId: { type: "number", optional: false },
	};
	// Create instance of Validator class
	const v = new Validator();
	// Use validate method on updatedPost using schema
	const validationResponse = v.validate(updatedPost, schema);
	// Check if validation response is false and return error
	if (validationResponse !== true) {
		return res.status(400).json({
			message: "Validation failed",
			error: validationResponse,
		});
	}
	models.Category.findByPk(req.body.categoryId)
		.then((result) => {
			if (result !== null && userId === req.userData.userId) {
				// Update the Post
				models.Post.update(updatedPost, { where: { id: id, userId: userId } })
					.then((result) => {
						if (result) {
							res.status(200).json({
								message: "Post updated successfully",
								post: updatedPost,
							});
						} else {
							res.status(403).json({
								message: "You don't have access to this Post!",
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
					message: "Invalid Category ID",
				});
			}
		})
		.catch((error) => {
			res.status(500).json({
				message: "Something went wrong!",
				error: error,
			});
		});
}

// Function to delete a Post

function destroy(req, res) {
	const id = req.params.id;
	const userId = req.userData.userId;

	models.Post.destroy({ where: { id: id, userId: userId } })
		.then((result) => {
			res.status(200).json({
				message: "Post deleted successfully",
			});
		})
		.catch((error) => {
			res.status(403).json({
				message: "Something went wrong!",
				error: result,
			});
		});
}

// Function to Like and unlike a Post

function like(req, res) {
	const like = { likes: req.userData.userid };
	console.log(req.userData); //DEBUG
	const post = models.Post.findByPk(req.params.id)
		.then(() => {
			if (!post.likes.includes(req.userData.userId)) {
				models.Post.updateOne(push(like));
				res.status(200).json("The post has been liked");
			} else {
				models.Post.updateOne(pull(like));
				res.status(200).json("The post has been unliked");
			}
		})
		.catch((error) => {
			res.status(500).json(error);
		});
}

module.exports = {
	save: save,
	show: show,
	index: index,
	update: update,
	destroy: destroy,
	like: like,
};
