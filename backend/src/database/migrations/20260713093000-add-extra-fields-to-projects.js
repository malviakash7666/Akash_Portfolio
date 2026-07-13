"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Projects", "features", {
      type: Sequelize.JSON,
      allowNull: true,
      defaultValue: [],
    });
    await queryInterface.addColumn("Projects", "screenshots", {
      type: Sequelize.JSON,
      allowNull: true,
      defaultValue: [],
    });
    await queryInterface.addColumn("Projects", "architecture", {
      type: Sequelize.TEXT,
      allowNull: true,
    });
    await queryInterface.addColumn("Projects", "databaseDesign", {
      type: Sequelize.TEXT,
      allowNull: true,
    });
    await queryInterface.addColumn("Projects", "challenges", {
      type: Sequelize.TEXT,
      allowNull: true,
    });
    await queryInterface.addColumn("Projects", "learnings", {
      type: Sequelize.TEXT,
      allowNull: true,
    });
    await queryInterface.addColumn("Projects", "showOnHome", {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Projects", "features");
    await queryInterface.removeColumn("Projects", "screenshots");
    await queryInterface.removeColumn("Projects", "architecture");
    await queryInterface.removeColumn("Projects", "databaseDesign");
    await queryInterface.removeColumn("Projects", "challenges");
    await queryInterface.removeColumn("Projects", "learnings");
    await queryInterface.removeColumn("Projects", "showOnHome");
  },
};
