const mongoose = require("mongoose");

// Use mongoose plugin to require unique email in the signup process.
const uniqueValidator = require('mongoose-unique-validator');

// Fucntion to require email validation before signup
let validateEmail = (email) => {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
};

const userSchema = new mongoose.Schema({
        username: {
            type: String,
            require: true,
            min: 3,
            max: 20,
            unique: true
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            unique: true,
            max: 50,
            validate: [validateEmail, 'Please fill a valid email address']
        },
        password: {
            type: String,
            required: true,
            min: 6
        },
        profilePicture: {
            type: String,
            default: "",
        },
        coverPicture: {
            type: String,
            default: ""
        },
        followers: {
            type: Array,
            default: []
        },
        following: {
            type: Array,
            default: []
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        desc: {
            type: String,
            max: 50
        },
        city: {
            type: String,
            max: 50
        },
        from: {
            type: String,
            max: 50
        },
        relationship: {
            type: Number,
            enum: [1, 2, 3]
        },
    }, {
        timestamps: true
    }

);

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);