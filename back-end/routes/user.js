const express = require('express');
const mongoose = require("mongoose");
const routes = express.Router();
const { validar } = require('../functions/valid');
require('../model/Categorias');
require('../model/Postagems');
const Categoria = mongoose.model("categorias");
const Postagems = mongoose.model("postagems")

// postagens
routes.get('/postagens', async (req, res) => {
    let data = await Postagems.find()
    .populate("categoria").sort({data: "desc"})
    .catch(console.log);
    console.log(data)
    res.json(data);
});

routes.post('/postagens/add', (req, res) => {
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