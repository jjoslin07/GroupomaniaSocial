"use strict";
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable(
			"Reactions",
			{
				id: {
					type: Sequelize.UUID,
					defaultValue: Sequelize.UUIDV4,
					primaryKey: true,
				},
				postId: {
					type: Sequelize.UUID,
					defaultValue: Sequelize.UUIDV4,
					allowNull: false,
					unique: "unique_tag",
				},
				userId: {
					type: Sequelize.UUID,
					defaultValue: Sequelize.UUIDV4,
					allowNull: false,
					unique: "unique_tag",
				},
				isLiked: {
					type: Sequelize.BOOLEAN,
					allowNull: false,
					default: false,
				},
				isLoved: {
					type: Sequelize.BOOLEAN,
					allowNull: false,
					default: false,
				},
				isFunny: {
					type: Sequelize.BOOLEAN,
					allowNull: false,
					default: false,
				},
				hasReaction: {
					type: Sequelize.BOOLEAN,
					allowNull: false,
					default: false,
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
						fields: ["postId", "userId"],
					},
				},
			}
		);
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("Reactions");
	},
};
