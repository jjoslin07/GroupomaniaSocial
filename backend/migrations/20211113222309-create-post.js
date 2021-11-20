"use strict";
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("Posts", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			title: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			content: {
				type: Sequelize.TEXT,
				allowNull: false,
			},
			imageUrl: {
				type: Sequelize.STRING,
			},
			categoryId: {
				type: Sequelize.INTEGER,
				default: 1,
			},
			userId: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			likes: {
				type: Sequelize.INTEGER,
			},
			loves: {
				type: Sequelize.INTEGER,
			},
			funny: {
				type: Sequelize.INTEGER,
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
		await queryInterface.dropTable("Posts");
	},
};
