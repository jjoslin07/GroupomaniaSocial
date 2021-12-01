const express = require("express");
const userCtrl = require("../controllers/user-controller");
const auth = require("../middleware/auth");

const router = express.Router();

// Signup Route
router.post("/sign-up", userCtrl.signUp);
// Login Route
router.post("/login", userCtrl.login);
// Update Route
router.patch("/:id", auth.checkAuth, userCtrl.update);
// Delete Route
router.delete("/:id", auth.checkAuth, userCtrl.destroy);
// Get a User
router.get("/:id", userCtrl.show);
// Get all Users
router.get("/", userCtrl.showAll);
// Follow a User
router.put("/:id/follow", auth.checkAuth, userCtrl.follow);
// Unfollow a User
router.delete("/:id/unfollow", auth.checkAuth, userCtrl.unfollow);
// Get Followers
router.get("/:id/followers", userCtrl.getFollowers);
// Get Following
router.get("/:id/following", userCtrl.getFollowing);

module.exports = router;
