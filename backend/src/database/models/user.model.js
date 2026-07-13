"use strict";

const { Model } = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
    }
  }

  User.init(
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
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
          notEmpty: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "user",
        validate: {
          isIn: [["admin", "user"]],
        },
      },
      bio: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      heroDescription: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      profileImage: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      resumeUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      socialLinks: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: {},
      },
      adminTwoFactorEnabled: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "Users",
      hooks: {
        beforeSave: async (user, options) => {
          // Hash password if it has changed
          if (user.changed("password")) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
          }

          // Enforce only one admin and restrict admin creation to seeder (or bypassed flows)
          if (user.changed("role") && user.role === "admin") {
            if (!options.bypassAdminCheck) {
              throw new Error("Admin role can only be assigned via seeder.");
            }

            const { Op } = require("sequelize");
            const existingAdmin = await User.findOne({
              where: {
                role: "admin",
                id: { [Op.ne]: user.id || 0 },
              },
              transaction: options.transaction,
            });

            if (existingAdmin) {
              throw new Error("An admin user already exists. Only one admin is allowed.");
            }
          }
        },
      },
    }
  );

  return User;
};
