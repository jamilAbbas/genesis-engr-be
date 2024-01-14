"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Universities", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      domains: {
        type: Sequelize.STRING,
      },
      web_pages: {
        type: Sequelize.STRING,
      },
      alpha_two_code: {
        type: Sequelize.STRING,
      },
      state_province: {
        type: Sequelize.STRING,
      },
      country: {
        type: Sequelize.STRING,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Universities");
  },
};
