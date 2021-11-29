"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert("Moods", [
			{
				name: "Cheerful",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: "Reflective",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: "Humorous",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: "Whimsical",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: "Mysterious",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: "Calm",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: "Lighthearted",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: "Hopeful",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: "Tense",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	down: async (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete("Moods", {}, null);
	},
};
