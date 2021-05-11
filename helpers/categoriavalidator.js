const Categoria = require("../models/categoria.js");

const existeCategoriaPorId = async (id) => {
    const existeCategoria = await Categoria.findById(id);
    if (!existeCategoria) {
        throw new Error("Esa Categoria no existe");
    }
}


module.exports = {
    existeCategoriaPorId
};