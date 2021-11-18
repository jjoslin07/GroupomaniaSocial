"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Comment extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Comment.hasMany(models.Reactions, { foreignKey: "postId" });
			Comment.belongsTo(models.Post, { foreignKey: "postId" });
			Comment.belongsTo(models.User, { foreignKey: "userId" });
		}
	}
	Comment.init(
		{
			content: DataTypes.TEXT,
			postId: DataTypes.INTEGER,
			userId: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "Comment",
		}
	);
	return Comment;
};
