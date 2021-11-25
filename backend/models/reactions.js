"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Reactions extends Model {
		static associate(models) {
			Reactions.belongsTo(models.Post, { foreignKey: "postId" });
			Reactions.belongsTo(models.Comment, { foreignKey: "postId" });
			Reactions.belongsTo(models.User, { foreignKey: "userId" });
		}
		toJSON() {
			return {
				...this.get(),
				createdAt: undefined,
				updatedAt: undefined,
				userId: undefined,
				id: undefined,
				// postId: undefined,
				PostId: undefined,
				hasReaction: undefined,
			};
		}
	}
	Reactions.init(
		{
			postId: DataTypes.INTEGER,
			userId: DataTypes.INTEGER,
			isLiked: DataTypes.BOOLEAN,
			isLoved: DataTypes.BOOLEAN,
			isFunny: DataTypes.BOOLEAN,
			hasReaction: DataTypes.BOOLEAN,
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
