"use strict";
// Importing
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("Users", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
				unique: true,
			},
			username: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			email: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			password: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			profilePicture: {
				type: Sequelize.STRING,
			},
			coverPicture: {
				type: Sequelize.STRING,
			},
			isAdmin: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
			},
			desc: {
				type: Sequelize.TEXT,
			},
			city: {
				type: Sequelize.STRING,
			},
			from: {
				type: Sequelize.STRING,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("Users");
	},
};
