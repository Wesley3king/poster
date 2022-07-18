const mongoose = require("mongoose");

// configurar o mongoose
    mongoose.connect("mongodb://127.0.0.1:27017/poster").then(()=> console.log("conectado ao mongoDB")).catch((e)=> console.log("Erro na conexão",e));
    