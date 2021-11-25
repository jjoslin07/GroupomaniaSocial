"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Comment extends Model {
		static associate(models) {
			// define association here
			Comment.hasMany(models.Reactions, { foreignKey: "postId" });
			Comment.belongsTo(models.Post, { foreignKey: "postId" });
			Comment.belongsTo(models.User, { foreignKey: "userId" });
		}
		toJSON() {
			return {
				...this.get(),
				createdAt: undefined,
				updatedAt: undefined,
				PostId: undefined,
				// postId: undefined,
				// id: undefined,
			};
		}
	}
	Comment.init(
		{
			content: DataTypes.TEXT,
			postId: DataTypes.INTEGER,
			userId: DataTypes.INTEGER,
			imageUrl: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "Comment",
		}
	);
	return Comment;
};
