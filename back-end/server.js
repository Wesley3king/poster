//poster 0.0.1 - loading modules
const express = require("express")
const app = express();
const mongoose = require("mongoose");
const routes = require("./Routes");
const port = process.env.PORT || 5000;

// configurar um diretorio de arquivos estaticos
app.use(express.static(path.join(__dirname,"public")));

//adicionar o arquivo de rotas

// adiministrador
app.use('/adimin',routes);

app.listen(port, ()=> console.log(`servidor rodando na porta : ${port}`));