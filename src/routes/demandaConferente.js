const express = require("express");
const demandaConferenteController = require("../../controllers/DemandaConferenteController.js");

const router = express.Router();

router.post("/newdemanda", demandaConferenteController.cadastrarDemanda);
router.get(
  "/buscardemandas/:conferente/:status",
  demandaConferenteController.buscarDemandas
);
router.put(
  "/atualizardemanda/:id",
  demandaConferenteController.atualizarRegistro
);

router.get("/demandaporid/:id", demandaConferenteController.buscarDemandaporID);

module.exports = router;
