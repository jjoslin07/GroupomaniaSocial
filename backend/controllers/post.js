const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Post = require('../models/Post');
const User = require('../models/User');

// Create a post
exports.createPost = async (req, res) => {
    const newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (error) {
        res.status(500).json(error);
    }
};
// Update a post
exports.updatePost = async (req, res) => {
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
};

// Delete a post

exports.deletePost = async (req, res) => {
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
};

// Add and remove like
exports.likePost = async (req, res) => {
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
};

// Add and remove Dislike 
exports.dislikePost = async (req, res) => {
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
};

// Get a post
exports.getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json(error);
    }
};

// Get Timeline 
exports.getTimeline = async (req, res) => {
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
};
