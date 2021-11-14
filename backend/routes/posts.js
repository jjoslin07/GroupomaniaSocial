const express = require("express");
const postsCtrl = require("../controllers/post-controller");
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

module.exports = router;
