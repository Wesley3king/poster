const express = require("express");
const routes = express.Router();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("./model/Categorias");
require("./model/Postagems")
const Categoria = mongoose.model("categorias");
const Postagems = mongoose.model("postagems")

const session = require("express-session");
const flash = require("connect-flash");
const { Router } = require("express");

//body parser
routes.use(bodyParser.urlencoded({extended: true}));
routes.use(bodyParser.json());

//cors
routes.use(cors());

//teste de middleware
routes.use((req, res, next)=> {
	console.log("i'm a middleware!");
	next();
});


//Sessão
routes.use(session({
    // no secret quanto mais coisas melhor
    secret: "aqui_pode_ser_qualquer_coisa",
    // resave
    resave: true,
    saveUninitialized: true
}));

// flash (só pode ser configurado abaixo da sessão)
routes.use(flash());

//middlware
routes.use((req, res, next) => {
    res.locals.success_msg = req.flash("sucess_msg");
    res.locals.error_msg  =req.flash("error_msg");
    next();
});

routes.get('/categorias/get', async (req, res) => {

    console.log("here")
    res.json(await Categoria.find());
});

routes.get('/posts', async (req, res) => {

    res.send("ok");
});

routes.post('/categorias/add', async (req, res) => {

    // validação do formulario
    let erros = [];

    if (!req.body.nome || typeof req.body.nome === "undefined" || req.body.nome == null) {
        erros.push("nome invalido");
    };
    if(!req.body.slug || typeof req.body.slug === "undefined" || req.body.slug == null) {
        erros.push("slug invalido");
    };
    if (req.body.nome.length < 2) {
        erros.push("nome da categoria é muito pequeno invalido");
    };
    if (req.body.slug.length < 2) {
        erros.push("slug da categoria é muito pequeno invalido");
    };

    if (erros.length > 0) {
        console.log("deu erro! ", erros);
        res.json({ err: erros });
    }else{

        console.log("dados : ", req.body);
        let novaCategoria  = {
            nome: req.body.nome,
            slug: req.body.slug
        };

        new Categoria(novaCategoria).save()
        .then(()=> {
            req.flash("success_msg", "categoria salva com sucesso!");
            res.send(true);
        })
        .catch((e)=> {
            req.flash("error_msg", "Erro ao salvar categoria");
            res.send(false);
            console.log("Erro em categorias/add : ", e)
        });
    }
});

//editar uma categoria

routes.post('/categorias/edit', (req, res) => {
    // validação do formulario
    let erros = [];

    if (!req.body.nome || typeof req.body.nome === "undefined" || req.body.nome == null) {
        erros.push("nome invalido");
    };
    if(!req.body.slug || typeof req.body.slug === "undefined" || req.body.slug == null) {
        erros.push("slug invalido");
    };
    if (req.body.nome.length < 2) {
        erros.push("nome da categoria é muito pequeno invalido");
    };
    if (req.body.slug.length < 2) {
        erros.push("slug da categoria é muito pequeno invalido");
    };

    if (erros.length > 0) {
        console.log("deu erro! ", erros);
        res.json({ err: erros });
    }else{
        console.log(req.body);
        Categoria.findOne({_id: req.body.id}).then( categoria => {
            categoria.nome = req.body.nome;
            categoria.slug = req.body.slug;

            categoria.save().then(()=> res.send(true)).catch(()=> res.send(false));
        });
    };

});

routes.post('/categorias/delete', async (req, res) => {
    console.log(req.body);
    
    Categoria.remove({ _id : req.body.id})
        .then(()=> res.send(true))
        .catch((e)=>{
            res.send(false);
            console.log(e);
        });
});

routes.get("/postagens", (req, res) => {
    let data = Postagems.find();
    res.send(true);
});

routes.post("/postagens/add", (req, res) => {
    /*Categoria.find()
    .then((categoria) => {
        res.json({});
    });*/
});



module.exports = routes;