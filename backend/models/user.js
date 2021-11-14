"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
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
				password: undefined,
				email: undefined,
				createdAt: undefined,
				updatedAt: undefined,
				isAdmin: undefined,
			};
		}
	}
	User.init(
		{
			name: DataTypes.STRING,
			email: DataTypes.STRING,
			password: DataTypes.STRING,
			profilePicture: DataTypes.STRING,
			coverPicture: DataTypes.STRING,
			followers: DataTypes.JSON,
			following: DataTypes.JSON,
			isAdmin: DataTypes.BOOLEAN,
			desc: DataTypes.STRING,
			city: DataTypes.STRING,
			from: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "User",
		}
	);
	return User;
};
