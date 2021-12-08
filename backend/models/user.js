"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		static associate(models) {
			// define association here
			User.hasMany(models.Post, { foreignKey: "userId" });
			User.hasMany(models.Reactions, { foreignKey: "userId" });
			User.hasMany(models.Comment, { foreignKey: "userId" });
			User.hasMany(models.Follow, { foreignKey: "userId" });
		}
		toJSON() {
			return {
				...this.get(),
				password: undefined,
				email: undefined,
				createdAt: undefined,
				updatedAt: undefined,
				isAdmin: undefined,
				id: undefined,
			};
		}
	}
	User.init(
		{
			username: DataTypes.STRING,
			email: DataTypes.STRING,
			password: DataTypes.STRING,
			profilePicture: DataTypes.STRING,
			coverPicture: DataTypes.STRING,
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
