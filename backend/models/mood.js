"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Mood extends Model {
		static associate(models) {
			Mood.belongsTo(models.Post, { foreignKey: "postId" });
		}
	}
	Mood.init(
		{
			name: DataTypes.STRING,
			postId: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "Mood",
		}
	);
	return Mood;
};
