const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const user = db.User;

class UserController {
  //CADASTRO DE USUARIO
  static criarUsuario = async (req, res) => {
    try {
      const { Usuario, Nome, SobreNome, Email, Senha, Cargo, Unidade } =
        req.body;
      const salt = await bcrypt.genSalt(12);
      const senhaHash = await bcrypt.hash(Senha, salt);
      const User = await user.create({
        Usuario,
        Nome,
        SobreNome,
        Email,
        Senha: senhaHash,
        Cargo,
        Unidade,
      });
      res.status(200).json(User);
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  };
  //AUTENTICAÇÃO DE USUARIO
  static autenticarUsuario = async (req, res) => {
    try {
      const { Usuario, Senha } = req.body;

      const dadosUsuario = await user.findOne({
        where: {
          Usuario: Usuario,
        },
      });

      const checkSenha = await bcrypt.compare(Senha, dadosUsuario.Senha);
      if (!checkSenha) {
        res.status(200).json({ Erro: "Usuario ou Senha Invalidos" });
      } else {
        const secret = process.env.SECRET;
        const token = jwt.sign(
          {
            Usuario: dadosUsuario.Usuario,
          },
          secret
        );

        res.status(200).json({
          Autenticado: "Autenticado com Sucesso",
          token,
          user: dadosUsuario.id,
        });
      }
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  };

  //EDITAR USUARIO
  static editarUsuario = async (req, res) => {
    const { senha } = req.body;
    try {
      const salt = await bcrypt.genSalt(12);
      const senhaHash = await bcrypt.hash(senha, salt);
      const Usuario = await user.update(
        {
          senha: senhaHash,
        },
        {
          where: {
            Usuario: req.params.id,
          },
        }
      );
      res.status(200).json(Usuario);
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  };

  //DELETAR USUARIO
  static deletarUsuario = async (req, res) => {
    try {
      const Usuario = await user.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json(Usuario);
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  };

  //BUSCAR USUARIOS
  static buscarUsuarios = async (req, res) => {
    try {
      const Usuario = await user.findAll({
        attributes: ["id", "usuario", "nome", "email", "cargo"],
      });
      res.status(200).json(Usuario);
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  };

  //BUSCAR UM USUARIO
  static buscarumUsuario = async (req, res) => {
    try {
      const usuarioId = await user.findOne({
        where: {
          id: req.params.id,
        },
        attributes: { exclude: ["role"] },
      });
      res.status(200).json({
        usuario: usuarioId.Usuario,
        nome: usuarioId.nome,
        sobreNome: usuarioId.sobreNome,
      });
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  };
}

module.exports = UserController;
