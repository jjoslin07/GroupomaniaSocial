"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Category extends Model {
		static associate(models) {
			Category.belongsTo(models.Post, { foreignKey: "postId" });
		}
	}
	Category.init(
		{
			name: DataTypes.STRING,
			postId: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "Category",
		}
	);
	return Category;
};
