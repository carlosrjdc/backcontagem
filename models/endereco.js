"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Endereco extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Endereco.hasMany(models.Contagem, {
        as: "enderecoContagem",
        foreignKey: "enderecoID",
      });
    }
  }
  Endereco.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      zona: {
        type: DataTypes.STRING,
      },
      corredor: {
        type: DataTypes.STRING,
      },
      predio: {
        type: DataTypes.STRING,
      },
      nivel: {
        type: DataTypes.STRING,
      },
      Enderecos: {
        type: DataTypes.STRING,
      },
      capacidade: {
        type: DataTypes.INTEGER,
      },
      Peso: {
        type: DataTypes.INTEGER,
      },
      Alt: {
        type: DataTypes.STRING,
      },
      Larg: {
        type: DataTypes.STRING,
      },
      Prof: {
        type: DataTypes.STRING,
      },
      SRE: {
        type: DataTypes.STRING,
      },
      codBloq: {
        type: DataTypes.STRING,
      },
      Tipo: {
        type: DataTypes.STRING,
      },
      Finalidade: {
        type: DataTypes.STRING,
      },
      Status: {
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
      modelName: "Endereco",
    }
  );
  return Endereco;
};
