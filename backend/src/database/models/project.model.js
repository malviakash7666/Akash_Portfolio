"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    static associate(models) {
      // define association here
    }
  }

  Project.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      problem: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      implementation: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      impact: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      techStack: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: [],
      },
      liveLink: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      githubLink: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      features: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: [],
      },
      screenshots: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: [],
      },
      architecture: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      databaseDesign: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      challenges: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      learnings: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      showOnHome: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: "Project",
      tableName: "Projects",
    }
  );

  return Project;
};
