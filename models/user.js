"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Inventario, {
        as: "userInventario",
        foreignKey: "registradoPor",
      });
      User.hasMany(models.DemandaConferente, {
        as: "userConferente",
        foreignKey: "conferenteId",
      });
      User.hasMany(models.Contagem, {
        as: "userContagem",
        foreignKey: "contagemId",
      });
    }
  }
  User.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      Usuario: {
        allowNull: false,
        unique: true,
        type: DataTypes.INTEGER,
      },
      Nome: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      SobreNome: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      Email: {
        type: DataTypes.STRING,
      },
      Senha: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      Cargo: {
        type: DataTypes.STRING,
      },
      Unidade: {
        type: DataTypes.STRING,
      },
      Setor: {
        type: DataTypes.STRING,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
