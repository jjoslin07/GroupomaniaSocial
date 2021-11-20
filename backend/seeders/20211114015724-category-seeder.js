"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert("Categories", [
			{
				name: "General",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: "Questions",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: "Events",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: "Learning",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: "Job Openings",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: "Funny",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: "Ideas",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	down: async (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete("Categories", {}, null);
	},
};
