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
  var corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  };

  app.use(
    express.json(),
    cors(corsOptions),
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
