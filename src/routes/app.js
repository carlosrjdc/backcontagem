const express = require("express");
const routes = require("../routes/index.js");
const SwaggerUi = require("swagger-ui-express");
const swaggerDocumento = require("../../swagger.json");

const app = express();
app.use(express.json());
app.use("/arquivos", express.static("uploads"));
app.use("/docs", SwaggerUi.serve, SwaggerUi.setup(swaggerDocumento));

routes(app);

module.exports = app;
