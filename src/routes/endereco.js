const express = require("express");
const enderecoController = require("../../controllers/EnderecosController.js");
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();

router.post(
  "/uploademmassa",
  upload.single("arquivo"),
  enderecoController.InputEmMassaContagem
);

router.get("/todosenderecos", enderecoController.buscarEnderecos);

module.exports = router;
