const db = require("../models");
const excelToJson = require("convert-excel-to-json");
require("dotenv").config();

const endereco = db.Endereco;

class EnderecoController {
  //CADASTRO DE USUARIO
  static InputEmMassaContagem = async (req, res) => {
    const result = excelToJson({
      source: req.file.buffer,
      columnToKey: {
        A: "zona",
        B: "corredor",
        C: "predio",
        D: "nivel",
        E: "Enderecos",
        F: "capacidade",
        G: "Peso",
        H: "Alt",
        I: "Larg",
        J: "Prof",
        K: "SRE",
        L: "codBloq",
        M: "Tipo",
        N: "Finalidade",
        O: "Status",
      },
      sheets: "ENDERECO",
    });

    result.ENDERECO.shift();
    try {
      const registro = await endereco.bulkCreate(result.ENDERECO);
      res.status(200).json(registro);
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  };
  static buscarEnderecos = async (req, res) => {
    try {
      const registro = await endereco.findAll();
      res.status(200).json(registro);
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  };
}

module.exports = EnderecoController;
