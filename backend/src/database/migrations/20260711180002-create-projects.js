"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Projects", {
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
      problem: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      implementation: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      impact: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      techStack: {
        type: Sequelize.JSON,
        allowNull: false,
        defaultValue: [],
      },
      liveLink: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      githubLink: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      category: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      image: {
        type: Sequelize.STRING,
        allowNull: true,
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

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Projects");
  },
};
