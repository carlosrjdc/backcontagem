const express = require("express");
const cors = require("cors");
const user = require("./user.js");
const endereco = require("./endereco.js");
const material = require("./material.js");
const inventario = require("./Inventario.js");
const demandaConferente = require("./demandaConferente.js");
const contagem = require("./contagem.js");

const routes = (app) => {
  app.route("/").get((req, res) => {
    res.status(200).send({ Titulo: "Carlos Roberto" });
  });

  app.use(
    express.json(),
    cors(),
    user,
    endereco,
    material,
    inventario,
    demandaConferente,
    contagem,

    express.raw({ type: "application/pdf" })
  );
};

module.exports = routes;
