const router = require('express').Router();
const userCtrl = require('../controllers/user');
const  auth  = require('../middleware/auth');
const  multer  = require('../middleware/multer-config');

// Register User
router.post("/register", userCtrl.register); 
// LOGIN
router.post("/login", userCtrl.login); 
// Update user
router.put("/:id", auth , multer, userCtrl.updateUser);
// Delete user
router.delete("/:id",auth, multer, userCtrl.deleteUser);
// Get a user
router.get("/:id", auth, userCtrl.getUser);
// Follow a user
router.put("/:id/follow",auth, userCtrl.followUser);
// Unfollow a user
router.put("/:id/unfollow",auth, userCtrl.unfollowUser);

module.exports = router;
