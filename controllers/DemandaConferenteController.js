const db = require("../models");
const { Op } = require("sequelize");
require("dotenv").config();

const demandaConferente = db.DemandaConferente;

class EnderecoController {
  //CADASTRO DE USUARIO
  static cadastrarDemanda = async (req, res) => {
    try {
      const registro = await demandaConferente.create(req.body);
      res.status(200).json(registro);
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  };

  static buscarDemandaporID = async (req, res) => {
    try {
      const registro = await demandaConferente.findAll({
        where: {
          inventarioDemandaId: req.params.id,
        },
      });
      res.status(200).json(registro);
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  };

  static buscarDemandas = async (req, res) => {
    const { conferente, status } = req.params;
    try {
      const registro = await demandaConferente.findAll({
        where: {
          [Op.and]: [
            { conferenteId: conferente },
            { Finalizado: { [Op.is]: null } },
          ],
        },
      });
      res.status(200).json(registro);
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  };

  static atualizarRegistro = async (req, res) => {
    try {
      const registro = await demandaConferente.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json(registro);
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  };
}

module.exports = EnderecoController;
