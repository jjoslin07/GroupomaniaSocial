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
				// email: undefined,
				createdAt: undefined,
				updatedAt: undefined,
				is_admin: undefined,
				// id: undefined,
			};
		}
	}
	User.init(
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
			},
			username: DataTypes.STRING,
			display_name: DataTypes.STRING,
			email: DataTypes.STRING,
			password: DataTypes.STRING,
			profile_picture: DataTypes.STRING,
			cover_picture: DataTypes.STRING,
			is_admin: DataTypes.BOOLEAN,
			desc: DataTypes.STRING,
			city: DataTypes.STRING,
			from: DataTypes.STRING,
			dept: DataTypes.STRING,
			year: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "User",
		}
	);
	return User;
};
