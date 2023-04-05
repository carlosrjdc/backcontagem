const express = require("express");
const invntarioController = require("../../controllers/InventariosController.js");

const router = express.Router();

router.post("/newinventario", invntarioController.cadastrarInventario);
router.get("/inventariosemaberto", invntarioController.InventariosEmAberto);
router.get("/todosinventarios", invntarioController.TodosInventarios);

module.exports = router;
