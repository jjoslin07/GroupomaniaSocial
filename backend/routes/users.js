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
//outer.delete("/:id", userCtrl.deleteUser);
// Get a User
//router.get("/:id", userCtrl.getUser);
// Follow a User
//router.put("/:id", userCtrl.followUser);
// Unfollow a User
//router.put("/:id", userCtrl.unfollowUser);

module.exports = router;
