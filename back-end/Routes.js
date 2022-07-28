const express = require("express");
const routes = express.Router();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("./model/Categorias");
require("./model/Postagems")
const Categoria = mongoose.model("categorias");
const Postagems = mongoose.model("postagems")

let { validar } = require("./functions/valid");

const session = require("express-session");
const flash = require("connect-flash");
const { Router } = require("express");

//body parser
routes.use(bodyParser.urlencoded({extended: true}));
routes.use(bodyParser.json());

//cors
routes.use(cors());

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

// obter categorias
routes.get('/categorias/get', async (req, res) => {
    res.json(await Categoria.find());
});

// adicionar categoria
routes.post('/categorias/add', async (req, res) => {

    // validação do formulario
    let erros = validar(req.body.nome, req.body.slug);

    if (erros) {
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
    let erros = validar(req.body.nome, req.body.slug);

    if (erros) {
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

// deletar uma categforia
routes.post('/categorias/delete', async (req, res) => {
    console.log(req.body);
    
    Categoria.remove({ _id : req.body.id})
        .then(()=> res.send(true))
        .catch((e)=>{
            res.send(false);
            console.log(e);
        });
});

// enviar as postagens
routes.get("/postagens", async (req, res) => {
    let data = await Postagems.find()
    .populate("categoria").sort({data: "desc"})
    .catch(console.log);
    console.log(data)
    res.json(data);
});

routes.post("/postagens/add", (req, res) => {

    // validação do nome e slug
    let erros = validar(req.body.titulo, req.body.slug);

    if (erros) {
        console.log("deu erro! ", erros);
        res.json({ err: erros });
    }else{
        const nova_postagem = {
            ...req.body
        }
        console.log(nova_postagem);

        new Postagems(nova_postagem).save()
            .then(()=> res.send(true))
            .catch((e)=> {
                console.log('erro ao registrar o post',e);
                res.send(false);
            })
    };
});



module.exports = routes;