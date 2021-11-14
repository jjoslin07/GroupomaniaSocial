"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Post extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
		toJSON() {
			return {
				...this.get(),
				createdAt: undefined,
				updatedAt: undefined,
				id: undefined,
				userId: undefined,
			};
		}
	}
	Post.init(
		{
			title: DataTypes.STRING,
			content: DataTypes.TEXT,
			imageUrl: DataTypes.STRING,
			categoryId: DataTypes.INTEGER,
			userId: DataTypes.INTEGER,
			likes: DataTypes.JSON,
			loves: DataTypes.JSON,
		},
		{
			sequelize,
			modelName: "Post",
		}
	);
	return Post;
};
