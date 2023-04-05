"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Inventario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Inventario.belongsTo(models.User, {
        as: "userInventario",
        foreignKey: "registradoPor",
      });

      Inventario.hasMany(models.DemandaConferente, {
        as: "inventarioDemanda",
        foreignKey: "inventarioDemandaId",
      });

      Inventario.hasMany(models.Contagem, {
        as: "inventarioContagem",
        foreignKey: "inventarioContagemId",
      });
    }
  }
  Inventario.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      registradoPor: {
        type: DataTypes.INTEGER,
        references: { model: "Users", key: "id" },
      },
      Data: {
        type: DataTypes.STRING,
      },
      Tipo: {
        type: DataTypes.STRING,
      },
      Status: {
        type: DataTypes.STRING,
      },
      Finalizado: {
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
      modelName: "Inventario",
    }
  );
  return Inventario;
};
