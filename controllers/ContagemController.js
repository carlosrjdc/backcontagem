const { Model } = require("sequelize");
var excel = require("excel4node");
const db = require("../models");
const { Op } = require("sequelize");
require("dotenv").config();
const wb = new excel.Workbook();
const ws = wb.addWorksheet("contagem");

const contagem = db.Contagem;

class EnderecoController {
  //CADASTRO DE USUARIO
  static cadastrarumacontagem = async (req, res) => {
    try {
      const registro = await contagem.create(req.body);
      res.status(200).json(registro);
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  };

  static atualizarRegistro = async (req, res) => {
    try {
      const registro = await contagem.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json(registro);
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  };

  static buscarContagemporDemanda = async (req, res) => {
    try {
      const registro = await contagem.findAll({
        where: { inventarioContagemId: req.params.id },
        attributes: { exclude: ["contagemId"] },
        include: [
          {
            model: db.Material,
            as: "skuContagem",
            attributes: ["Sku", "Descricao"],
          },
        ],
      });
      res.status(200).json(registro);
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  };

  static buscarContagemporDemandaExcel = async (req, res) => {
    const registro = await contagem.findAll({
      where: { inventarioContagemId: req.params.id },
      attributes: { exclude: ["contagemId"] },
      include: [
        {
          model: db.Material,
          as: "skuContagem",
          attributes: ["Sku", "Descricao"],
        },
      ],
    });

    let inicial = 1;

    ws.cell(inicial, 1).string("ID");
    ws.cell(inicial, 2).string("Endereço");
    ws.cell(inicial, 3).string("Sku");
    ws.cell(inicial, 4).string("Descrição");
    ws.cell(inicial, 5).string("Lote");
    ws.cell(inicial, 6).string("Quantidade");
    ws.cell(inicial, 7).string("Unidade");

    registro.forEach((item, i) => {
      ws.cell(i + 1 + inicial, 1).number(
        item.id === null || item.id === undefined ? 0 : item.id
      ); //O primeiro parametro é a linha da planilha o segundo é a coluna
      ws.cell(i + 1 + inicial, 2).string(
        item.Endereco === null || item.Endereco === undefined
          ? ""
          : item.Endereco
      ); //O primeiro parametro é a linha da planilha o segundo é a coluna
      ws.cell(i + 1 + inicial, 3).string(
        item?.skuContagem?.Sku === null || item?.skuContagem?.Sku === undefined
          ? ""
          : String(item?.skuContagem?.Sku)
      ); //O primeiro parametro é a linha da planilha o segundo é a coluna
      ws.cell(i + 1 + inicial, 4).string(
        item?.skuContagem?.Descricao === null ||
          item?.skuContagem?.Descricao === undefined
          ? ""
          : String(item?.skuContagem?.Descricao)
      ); //O primeiro parametro é a linha da planilha o segundo é a coluna

      ws.cell(i + 1 + inicial, 5).string(
        item.Lote === null || item.Lote === undefined ? "" : String(item.Lote)
      ); //O primeiro parametro é a linha da planilha o segundo é a coluna

      ws.cell(i + 1 + inicial, 6).number(
        item.Quantidade === null || item.Quantidade === undefined
          ? 0
          : item.Quantidade
      ); //O primeiro parametro é a linha da planilha o segundo é a coluna

      ws.cell(i + 1 + inicial, 7).number(
        item.Unidade === null || item.Unidade === undefined ? 0 : item.Unidade
      ); //O primeiro parametro é a linha da planilha o segundo é a coluna
    });

    try {
      //res.status(200).json(registro);
      wb.write("Contagem.xlsx", res);
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  };

  static buscarContagemConferente = async (req, res) => {
    try {
      const registro = await contagem.findAll({
        where: { demandaContagemId: req.params.id },
        attributes: { exclude: ["contagemId"] },
      });
      res.status(200).json(registro);
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  };

  static buscarContagemConferenteEmAberto = async (req, res) => {
    try {
      const registro = await contagem.findAll({
        where: {
          [Op.and]: [
            { demandaContagemId: req.params.id },
            {
              Quantidade: {
                [Op.is]: null,
              },
            },
          ],
        },
        attributes: { exclude: ["contagemId"] },
      });
      res.status(200).json(registro);
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  };

  static buscarRegistros = async (req, res) => {
    try {
      const registro = await contagem.findAll({
        attributes: ["id"],
        include: [
          { model: db.User, as: "userContagem" },
          { model: db.Inventario, as: "inventarioContagem" },
          { model: db.DemandaConferente, as: "inventarioDemandaContagem" },
          { model: db.Material, as: "skuContagem" },
        ],
      });
      res.status(200).json(registro);
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  };
  static cadastrarContagem = async (req, res) => {
    try {
      const registro = await db.Endereco.findAll({
        where: req.body,
      });
      const registroNovo = [];
      registro.map((item) => {
        registroNovo.push({
          inventarioContagemId: req.params.id,
          demandaContagemId: req.params.demanda,
          userContagemId: req.params.conferente,
          enderecoId: item.id,
          Zona: item.zona,
          Corredor: item.corredor,
          Predio: item.predio,
          Nivel: item.nivel,
          Endereco: item.Enderecos,
        });
      });

      const criarRegistros = await contagem.bulkCreate(registroNovo);

      res.status(200).json(criarRegistros);
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  };
}

module.exports = EnderecoController;
