const express = require("express");
const materialController = require("../../controllers/MaterialController.js");
const multer = require("multer");
const { route } = require("./contagem.js");

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();

router.post(
  "/uploademmassamaterial",
  upload.single("arquivo"),
  materialController.InputEmMassaSku
);
router.get("/buscarmaterial/:id", materialController.buscarItem);
router.get("/allmaterial", materialController.todosMateriais);

router.put("/atualizarmaterial", materialController.atualizarRegistros);

module.exports = router;
