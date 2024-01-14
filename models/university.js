"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class University extends Model {
    static associate(models) {}
  }
  University.init(
    {
      name: DataTypes.STRING,
      domains: DataTypes.STRING,
      alpha_two_code: DataTypes.STRING,
      web_pages: DataTypes.STRING,
      state_province: DataTypes.STRING,
      country: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "University",
      tableName: "Universities",
      timestamps: true,
      underscored: true,
    }
  );
  return University;
};
