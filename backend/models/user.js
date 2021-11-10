const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite::memory:");

// Fucntion to require email validation before signup
let validateEmail = (email) => {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
};
module.exports = (sequelize, DataTypes) => {
class User extends Model {}

User.init({
  // Model attributes are defined here
  username: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true
},
    email: {
    type: DataTypes.STRING(50),
    allowNull: false,
    lowercase: true,
    unique: true,
    validate: [validateEmail, 'Please fill a valid email address']
},
password: {
    type: DataTypes.STRING,
    allowNull: false,
},
profilePicture: {
    type: DataTypes.BLOB,
    default: null
},
coverPicture: {
    type: DataTypes.BLOB,
    default: null
},
followers: {
    type: DataTypes.JSON,
    default: null
},
following: {
    type: DataTypes.JSON,
    default: null
},
isAdmin: {
    type: DataTypes.BOOLEAN,
    default: false,
},
desc: {
    type: DataTypes.STRING(500),
},
city: {
    type: DataTypes.STRING(50),
},
from: {
    type: DataTypes.STRING(50),
},
relationship: {
    type: DataTypes.ENUM,
    enum: [1, 2, 3]
},
}, {
timestamps: true
},
 {
  sequelize,
  modelName: 'User' 
});
return User
}