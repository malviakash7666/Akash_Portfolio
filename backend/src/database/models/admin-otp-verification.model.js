"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class AdminOtpVerification extends Model {
    static associate(models) {
      AdminOtpVerification.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });
    }
  }

  AdminOtpVerification.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      otpHash: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "LOGIN_2FA",
      },
      attempts: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      expiresAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      verifiedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "AdminOtpVerification",
      tableName: "AdminOtpVerifications",
    }
  );

  return AdminOtpVerification;
};
