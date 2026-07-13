"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Skill extends Model {
    static associate(models) {
      // define association here
    }
  }

  Skill.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      level: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },
    {
      sequelize,
      modelName: "Skill",
      tableName: "Skills",
    }
  );

  return Skill;
};
