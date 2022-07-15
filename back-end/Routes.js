const express = require("express");
const routes = express.Router();
const cors = require("cors");
const bodyParser = require("body-parser");

routes.use(bodyParser.urlencoded({extended: true}));
routes.use(bodyParser.json());
routes.use(cors());
//routes.use(express.json());

routes.get('/', async (req, res) => {

    res.send("ok");
});

routes.get('/posts', async (req, res) => {

    res.send("ok");
});

routes.get('/cadastrar', async (req, res) => {

    res.send("ok");
})



module.exports = routes;