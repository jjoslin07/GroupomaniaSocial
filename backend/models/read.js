"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Read extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	Read.init(
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
			modelName: "Read",
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
	return Read;
};
