"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Certificate extends Model {
    static associate(models) {
      // define association here
    }
  }

  Certificate.init(
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
      issuer: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      issueDate: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      link: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Certificate",
      tableName: "Certificates",
    }
  );

  return Certificate;
};
