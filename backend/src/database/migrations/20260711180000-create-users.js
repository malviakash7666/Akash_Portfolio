"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      role: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "user",
      },
      bio: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      heroDescription: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      profileImage: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      resumeUrl: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      socialLinks: {
        type: Sequelize.JSON,
        allowNull: true,
        defaultValue: {},
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

    // Add unique partial index for single admin constraint at DB level
    await queryInterface.addIndex("Users", ["role"], {
      unique: true,
      where: {
        role: "admin",
      },
      name: "users_role_admin_unique",
    });
  },

  async down(queryInterface, Sequelize) {
    // Drop index first
    await queryInterface.removeIndex("Users", "users_role_admin_unique");
    await queryInterface.dropTable("Users");
  },
};
