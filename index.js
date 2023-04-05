const app = require("./src/routes/app.js");

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Escutando requisição na Porta http://localhost:${port}`);
});
