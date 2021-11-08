const router = require("express").Router();
const postCtrl = require('../controllers/post');
const  auth  = require('../middleware/auth');
const  multer  = require('../middleware/multer-config');

// Create a post
router.post("/", auth, multer, postCtrl.createPost);
// Update a post
router.put("/:id", auth, multer, postCtrl.updatePost);
// Delete a post
router.delete("/:id", auth, multer, postCtrl.deletePost);
// Add and remove like
router.put("/:id/like", auth, multer, postCtrl.likePost);
// Add and remove Dislike 
router.put("/:id/dislike", auth, multer, postCtrl.dislikePost);
// Get a post
router.get("/:id", auth, multer, postCtrl.getPost);
// Get timeline posts
router.get("/timeline/all", auth, multer, postCtrl.getTimeline);

module.exports = router;