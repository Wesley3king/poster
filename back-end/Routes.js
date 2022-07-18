const express = require("express");
const routes = express.Router();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("./model/Categorias");
const Categoria = mongoose.model("categorias");

routes.use(bodyParser.urlencoded({extended: true}));
routes.use(bodyParser.json());

routes.use(cors());
//routes.use(express.json());

//teste de middleware
routes.use((req, res, next)=> {
	console.log("i'm a middleware!");
	next();
});

routes.get('/', async (req, res) => {

    res.send("ok");
});

routes.get('/posts', async (req, res) => {

    res.send("ok");
});

routes.post('/categorias/add', async (req, res) => {

    console.log("dados : ", req.body);
    let novaCategoria  = {
        nome: req.body.nome,
        slug: req.body.slug
    };

    new Categoria(novaCategoria).save()
    .then(()=> res.send(true))
    .catch((e)=> {
        res.send(false);
        console.log("Erro em categorias/add : ", e)
    });
});



module.exports = routes;