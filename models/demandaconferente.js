"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class DemandaConferente extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      DemandaConferente.belongsTo(models.User, {
        as: "userConferente",
        foreignKey: "conferenteId",
      });

      DemandaConferente.belongsTo(models.Inventario, {
        as: "inventarioDemanda",
        foreignKey: "inventarioDemandaId",
      });

      DemandaConferente.hasMany(models.Contagem, {
        as: "inventarioDemandaContagem",
        foreignKey: "demandaContagemId",
      });
    }
  }
  DemandaConferente.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      conferenteId: {
        type: DataTypes.INTEGER,
        references: { model: "Users", key: "id" },
      },
      inventarioDemandaId: {
        type: DataTypes.INTEGER,
        references: { model: "Inventarios", key: "id" },
      },
      Data: {
        type: DataTypes.STRING,
      },
      Status: {
        type: DataTypes.STRING,
      },
      Iniciado: {
        type: DataTypes.DATE,
      },
      Finalizado: {
        type: DataTypes.DATE,
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
      modelName: "DemandaConferente",
    }
  );
  return DemandaConferente;
};
