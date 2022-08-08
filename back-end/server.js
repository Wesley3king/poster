//poster 0.0.1 - loading modules
const express = require("express")
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
//const mongoose = require("mongoose");
const routes = require("./routes/Routes");
const user_routes = require("./routes/user");

const port = process.env.PORT || 5200;

// configurar um diretorio de arquivos estaticos
//app.use(express.static(path.join(__dirname,"public")));

//adicionar o arquivo de rotas


//body parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//cors
app.use(cors());

//user 
app.use('/', user_routes);
// adiministrador
app.use('/adimin',routes);

app.listen(port, ()=> console.log(`servidor rodando na porta : ${port}`));