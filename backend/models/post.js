"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Post extends Model {
		static associate(models) {
			// define association here
			Post.belongsTo(models.User, { foreignKey: "userId" });
			Post.hasMany(models.Comment, { foreignKey: "postId" });
			Post.hasMany(models.Reactions, { foreignKey: "postId" });
			Post.hasMany(models.Category, { foreignKey: "postId" });
			Post.hasMany(models.Mood, { foreignKey: "postId" });
		}
		toJSON() {
			return {
				...this.get(),
				// createdAt: undefined,
				// updatedAt: undefined,
				// userId: undefined,
			};
		}
	}
	Post.init(
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
			},
			content: DataTypes.TEXT,
			imageUrl: DataTypes.STRING,
			categoryId: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
			},
			moodId: DataTypes.INTEGER,
			userId: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
			},
			is_read: DataTypes.BOOLEAN,
			likes: DataTypes.INTEGER,
			loves: DataTypes.INTEGER,
			funny: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "Post",
		}
	);
	return Post;
};
