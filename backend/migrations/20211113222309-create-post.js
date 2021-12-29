"use strict";
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("Posts", {
			id: {
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
				primaryKey: true,
			},
			content: {
				type: Sequelize.TEXT,
				allowNull: false,
			},
			imageUrl: {
				type: Sequelize.STRING,
			},
			categoryId: {
				type: Sequelize.STRING,
				default: "General",
			},
			moodId: {
				type: Sequelize.STRING,
				default: "None",
			},
			userId: {
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
				allowNull: false,
			},
			likes: {
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
