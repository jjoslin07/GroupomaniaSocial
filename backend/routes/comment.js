const express = require("express");
const commentCtrl = require("../controllers/comment-controller");
const router = express.Router();
const auth = require("../middleware/auth");
//const auth = require("../middleware/check-auth");

// Make a comment
router.post("/", auth.checkAuth, commentCtrl.save);
// Get a comment
router.get("/", commentCtrl.index);
// Get all comments
router.get("/:id", commentCtrl.show);
// Update a comment
router.patch("/:id", auth.checkAuth, commentCtrl.update);
// Delete a comment
router.delete("/:id", auth.checkAuth, commentCtrl.destroy);

module.exports = router;
