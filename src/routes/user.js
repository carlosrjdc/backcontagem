const express = require("express");
const autenticar = require("../../controllers/auth.js");
const userController = require("../../controllers/UserController.js");

const router = express.Router();

router.post("/user/newuser", userController.criarUsuario);
router.post("/user/auth", userController.autenticarUsuario);
router.get("/usuarios", userController.buscarUsuarios);

module.exports = router;
