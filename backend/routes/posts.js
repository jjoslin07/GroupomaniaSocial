const router = require("express").Router();
const Post = require("../models/post");


// Create a post

router.post("/", async (req, res) => {
    const newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (error) {
        res.status(500).json(error);
    }
});
// Update a post

router.put("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.updateOne({
                $set: req.body
            });
            res.status(200).json("You have updated your post");
        } else {
            res.status(403).json("You can only update your post");
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

// Delete a post

router.delete("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.deleteOne();
            res.status(200).json("You have deleted your post");
        } else {
            res.status(403).json("You can only delete your post");
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

// Add and remove like

router.put("/:id/like", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post.likes.includes(req.body.userId) && (!post.dislikes.includes(req.body.userId))) {
            await post.updateOne({
                $push: {
                    likes: req.body.userId
                }
            });
            res.status(200).json("The post has been liked");
        } else {
            await post.updateOne({
                $pull: {
                    likes: req.body.userId
                }
            });
            res.status(200).json("The post has been unliked");
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

// Add and remove Dislike 

router.put("/:id/dislike", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post.dislikes.includes(req.body.userId) && (!post.likes.includes(req.body.userId))) {
            await post.updateOne({
                $push: {
                    dislikes: req.body.userId
                }
            });
            res.status(200).json("The post has been disliked");
        } else {
            await post.updateOne({
                $pull: {
                    dislikes: req.body.userId
                }
            });
            res.status(200).json("The post has been undisliked");
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

// Get a post

router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json(error);
    }
})

// Get timeline posts

router.get("/timeline/all", async (req, res) => {
    try {
        const currentUser = await User.findById(req.body.userId);
        const userPosts = await Post.find({
            userId: currentUser._id
        });
        const friendPosts = await Promise.all(
            currentUser.following.map((friendId) => {
                return Post.find({
                    userId: friendId
                });
            })
        );
        res.json(userPosts.concat(...friendPosts));
    } catch (error) {
        res.status(500).json(error);
    }
});


module.exports = router;