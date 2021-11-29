"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Follow extends Model {
		static associate(models) {
			Follow.belongsTo(models.User, { foreignKey: "userId" });
		}
	}
	Follow.init(
		{
			userId: DataTypes.INTEGER,
			followerId: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "Follow",
		}
	);
	return Follow;
};
