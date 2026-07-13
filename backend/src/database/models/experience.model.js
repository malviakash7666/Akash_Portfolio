"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Experience extends Model {
    static associate(models) {
      // define association here
    }
  }

  Experience.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      company: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      location: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      period: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      description: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: [],
      },
      current: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Experience",
      tableName: "Experiences",
    }
  );

  return Experience;
};
