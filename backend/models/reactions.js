"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Reactions extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Reactions.belongsTo(models.Post, { foreignKey: "postId" });
			Reactions.belongsTo(models.Comment, { foreignKey: "postId" });
			Reactions.belongsTo(models.User, { foreignKey: "userId" });
		}
	}
	Reactions.init(
		{
			postId: DataTypes.INTEGER,
			userId: DataTypes.INTEGER,
			isLiked: DataTypes.BOOLEAN,
			isLoved: DataTypes.BOOLEAN,
			isFunny: DataTypes.BOOLEAN,
		},

		{
			sequelize,
			modelName: "Reactions",
		},
		{
			indexes: [
				{
					unique: true,
					fields: ["postId", "userId"],
				},
			],
		}
	);
	return Reactions;
};
