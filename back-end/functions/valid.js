// validações

// validar nome e slug
const validar = (nome, slug) => {
    let erros = [];

    if (!nome || typeof nome === "undefined" || nome == null) {
        erros.push("nome invalido");
    };
    if(!slug || typeof slug === "undefined" || slug == null) {
        erros.push("slug invalido");
    };
    if (nome.length < 2) {
        erros.push("nome da categoria é muito pequeno invalido");
    };
    if (slug.length < 2) {
        erros.push("slug da categoria é muito pequeno invalido");
    };

    console.log(erros);
    if (erros.length > 0) {
        console.log("deu erro! ", erros);
        return erros;
    }else{
        return false;
    }
};

module.exports = { validar };