//poster 0.0.1 - loading modules
const app = require("express")();
const mongoose = require("mongoose");
const routes = require("./Routes");
const port = process.env.PORT || 5000;

//adicionar o arquivo de rotas
app.use(routes);

app.listen(port, ()=> console.log(`servidor rodando na porta : ${port}`));