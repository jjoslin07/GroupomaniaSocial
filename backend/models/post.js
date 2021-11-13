const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

module.exports = (sequelize, DataTypes) => {
class Post extends Model {}

Post.init({
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true
    },
    desc: {
        type: DataTypes.STRING(500)
    },
    img: {
        type: DataTypes.BLOB,
        default: null
    },
    likes: {
        type: DataTypes.JSON,
        default: null
    },
    dislikes: {
        type: DataTypes.BLOB,
        default: null
    },
}, {
    timestamps: true
},
{
    sequelize,
    modelName: 'Post'
});
   console.log(Post === sequelize.models.Post);
   return Post    
}
