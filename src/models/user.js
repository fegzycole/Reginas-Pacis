"use strict";

import { genSaltSync, hashSync } from "bcryptjs";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {}

  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isSuperAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "User",
      hooks: {
        beforeSave: (user) => {
          if (user.changed("password")) {
            const salt = genSaltSync(10);
            user.password = hashSync(user.password, salt);
          }
        },
      },
      timestamps: true,
    }
  );

  User.prototype.getSafeDataValues = function getSafeDataValues() {
    const { id, password, createdAt, updatedAt, ...data } = this.dataValues;

    return data;
  };

  return User;
};
