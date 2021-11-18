const express = require("express");
const postsCtrl = require("../controllers/post-controller");
const commentCtrl = require("../controllers/comment-controller");
const reactions = require("../controllers/reactions");
const router = express.Router();
const auth = require("../middleware/auth");

// Create a new Post
router.post("/", auth.checkAuth, postsCtrl.save);
// Get all Posts
router.get("/", postsCtrl.index);
// Get individual Post
router.get("/:id", postsCtrl.show);
// Update a Post
router.patch("/:id", auth.checkAuth, postsCtrl.update);
// Delete a Post
router.delete("/:id", auth.checkAuth, postsCtrl.destroy);
// Like a Post
router.post("/:id/like", auth.checkAuth, reactions.like);
// Unlike a Post
router.delete("/:id/like", auth.checkAuth, reactions.unlike);
// Love a post
router.post("/:id/love", auth.checkAuth, reactions.love);
// Unlove a post
router.delete("/:id/love", auth.checkAuth, reactions.unlove);
// Lol a Post
router.post("/:id/funny", auth.checkAuth, reactions.funny);
// Remove Lol
router.delete("/:id/funny", auth.checkAuth, reactions.unfunny);
// Get Reactions
router.get("/:id/reactions", reactions.getReaction);

// Make a comment
router.post("/:id/comment", auth.checkAuth, commentCtrl.save);
// Get a comment
router.get("/:id/comment/:id", commentCtrl.show);
// Get all comments
router.get("/:id/comment", commentCtrl.showAll);
// Update a comment
router.patch("/:id/comment", auth.checkAuth, commentCtrl.update);
// Delete a comment
router.delete("/:id/comment", auth.checkAuth, commentCtrl.destroy);

module.exports = router;
