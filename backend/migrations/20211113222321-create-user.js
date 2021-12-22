("use strict");
// Importing
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("Users", {
			id: {
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
				primaryKey: true,
			},
			username: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			display_name: Sequelize.STRING,
			email: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			password: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			profile_picture: {
				type: Sequelize.STRING,
			},
			cover_picture: {
				type: Sequelize.STRING,
			},
			is_admin: {
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
			dept: {
				type: Sequelize.STRING,
			},
			year: {
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
		await queryInterface.dropTable("Users");
	},
};
