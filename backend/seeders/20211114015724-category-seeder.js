"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert("Categories", [
			{
				name: "Work",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: "Funny",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: "Jobs",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: "Help",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	down: async (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete("Categories", {}, null);
	},
};
