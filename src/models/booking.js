"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {}

  Booking.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      startDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      endDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      amountPaid: {
        type: DataTypes.NUMBER,
        allowNull: false,
      },
      massIntention: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      bookedBy: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Booking",
    }
  );
  return Booking;
};
