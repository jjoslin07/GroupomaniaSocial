const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

// Register User
router.post("/register", async (req, res) => {
    try {
        // Generate hashed password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        // Create new user
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });
        // Save user and return response
        const user = await newUser.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error);
    }
});

// LOGIN

router.post("/login", async (req, res) => {
    try {
        // Check for valid user
        const user = await User.findOne({
            email: req.body.email,
        });
        !user && res.status(404).json("User not found!");
        // Compare user password to password entered
        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );
        !validPassword && res.status(400).json("Password is incorrect!");
        // If valid send user info
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;