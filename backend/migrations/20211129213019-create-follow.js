"use strict";
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable(
			"Follows",
			{
				id: {
					allowNull: false,
					autoIncrement: true,
					primaryKey: true,
					type: Sequelize.INTEGER,
				},
				userId: {
					type: Sequelize.INTEGER,
					allowNull: false,
					unique: "unique_tag",
				},
				followerId: {
					type: Sequelize.INTEGER,
					allowNull: false,
					unique: "unique_tag",
				},
				createdAt: {
					allowNull: false,
					type: Sequelize.DATE,
				},
				updatedAt: {
					allowNull: false,
					type: Sequelize.DATE,
				},
			},
			{
				uniqueKeys: {
					unique_tag: {
						customIndex: true,
						fields: ["userId", "followerId"],
					},
				},
			}
		);
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("Follows");
	},
};
