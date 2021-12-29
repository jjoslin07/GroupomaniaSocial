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
				// PostId: undefined,
			};
		}
	}
	Reactions.init(
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
			},
			postId: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
			},
			userId: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
			},
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
