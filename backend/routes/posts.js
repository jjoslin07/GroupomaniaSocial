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
// Get all Users Posts
router.get("/profile/:username", postsCtrl.indexUser);
// Get individual Post
router.get("/:id", postsCtrl.show);
// Update a Post
router.patch("/:id", auth.checkAuth, postsCtrl.update);
// Delete a Post
router.delete("/:id", auth.checkAuth, postsCtrl.destroy);

// Get category's
router.get("/category/all", postsCtrl.category);
// Get moods
router.get("/mood/all", postsCtrl.mood);

// Like and unlike post
router.post("/:id/like", auth.checkAuth, reactions.like);

// Get Reactions
router.get("/:id/reactions", reactions.getReaction);

// Make a comment
router.post("/:id/comment", auth.checkAuth, commentCtrl.save);
// Get a comment
router.get("/:id/comment/:id", commentCtrl.show);
// Get all comments
router.get("/:id/comment", commentCtrl.showAll);
// Update a comment
router.patch("/:id/comment/:id", auth.checkAuth, commentCtrl.update);
// Delete a comment
router.delete("/:id/comment/:id", auth.checkAuth, commentCtrl.destroy);

module.exports = router;
