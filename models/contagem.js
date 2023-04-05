"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Contagem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Contagem.belongsTo(models.User, {
        as: "userContagem",
        foreignKey: "userContagemId",
      });
      Contagem.belongsTo(models.Material, {
        as: "skuContagem",
        foreignKey: "materialId",
      });

      Contagem.belongsTo(models.Inventario, {
        as: "inventarioContagem",
        foreignKey: "inventarioContagemId",
      });

      Contagem.belongsTo(models.DemandaConferente, {
        as: "inventarioDemandaContagem",
        foreignKey: "demandaContagemId",
      });

      Contagem.belongsTo(models.Endereco, {
        as: "enderecoContagem",
        foreignKey: "enderecoId",
      });
    }
  }
  Contagem.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      inventarioContagemId: {
        type: DataTypes.INTEGER,
        references: { model: "Inventarios", key: "id" },
      },
      demandaContagemId: {
        type: DataTypes.INTEGER,
        references: { model: "DemandaConferentes", key: "id" },
      },
      userContagemId: {
        type: DataTypes.INTEGER,
        references: { model: "Users", key: "id" },
      },
      enderecoId: {
        type: DataTypes.INTEGER,
        references: { model: "Enderecos", key: "id" },
      },
      Zona: {
        type: DataTypes.STRING,
      },
      Corredor: {
        type: DataTypes.STRING,
      },
      Predio: {
        type: DataTypes.STRING,
      },
      Nivel: {
        type: DataTypes.STRING,
      },
      Endereco: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      materialId: {
        type: DataTypes.INTEGER,
        references: { model: "Materials", key: "id" },
      },
      Lote: {
        type: DataTypes.STRING,
      },
      Fabricação: {
        type: DataTypes.STRING,
      },
      Quantidade: {
        type: DataTypes.INTEGER,
      },
      UnidadMedida: {
        type: DataTypes.STRING,
      },
      Unidade: {
        type: DataTypes.INTEGER,
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
      modelName: "Contagem",
    }
  );
  return Contagem;
};
