'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      profilePicture: {
        type: Sequelize.STRING
      },
      coverPicture: {
        type: Sequelize.STRING
      },
      followers: {
        type: Sequelize.JSON
      },
      following: {
        type: Sequelize.JSON
      },
      isAdmin: {
        type: Sequelize.BOOLEAN
      },
      desc: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      from: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};