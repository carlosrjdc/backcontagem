const express = require("express");
const contagemController = require("../../controllers/ContagemController.js");

const router = express.Router();

router.post(
  "/newcontagem/:id/:demanda/:conferente",
  contagemController.cadastrarContagem
);
router.get("/todosregistros", contagemController.buscarRegistros);
router.get(
  "/registroconferencia/:id",
  contagemController.buscarContagemConferente
);

router.get(
  "/listarcontagempordemanda/:id",
  contagemController.buscarContagemporDemanda
);

router.get(
  "/registroconferenciaemaberto/:id",
  contagemController.buscarContagemConferenteEmAberto
);

router.put("/atualizarcontagem/:id", contagemController.atualizarRegistro);

router.get("/excel/:id", contagemController.buscarContagemporDemandaExcel);

module.exports = router;
