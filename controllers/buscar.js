const { response } = require("express");
const { ObjectId } = require("mongoose").Types
const { Usuario, Categoria, Producto } = require("../models")


const coleccionesPermitidas = [
    "usuarios",
    "categorias",
    "productos",
    "roles"
];

const buscarProducto = async (termino = "", res = response) => {
    const esMongoId = ObjectId.isValid(termino);
    if (esMongoId) {
        const producto = await (await Producto.findById(termino)).populate("categoria", "nombre");
        return res.status(200).json({
            results: (producto) ? [producto] : []
        })
    }

    const regex = new RegExp(termino, "i");

    const productos = await Producto.find({
        $and: [{ nombre: regex }, { estado: true }]
    }).populate("categoria", "nombre")
    res.json({
        results: productos
    })
}

const buscarCategorias = async (termino = "", res = response) => {

    const esMongoId = ObjectId.isValid(termino);
    if (esMongoId) {
        const categoria = await Categoria.findById(termino);
        return res.status(200).json({
            results: (categoria) ? [categoria] : []
        })
    }

    const regex = new RegExp(termino, "i");

    const categorias = await Categoria.find({
        $and: [{ nombre: regex }, { estado: true }]
    })
    res.json({
        results: categorias
    })
}

const buscarUsuarios = async (termino = "", res = response) => {

    const esMongoId = ObjectId.isValid(termino);

    if (esMongoId) {
        const usuario = await Usuario.findById(termino);
        return res.status(200).json({
            results: (usuario) ? [usuario] : []
        })
    }

    const regex = new RegExp(termino, "i");

    const usuarios = await Usuario.find({
        $or: [{ nombre: regex }, { correo: regex }],
        $and: [{ estado: true }]
    })
    res.json({
        results: usuarios
    })

}

const buscar = async (req, res = response) => {
    const { termino, coleccion } = req.params;
    if (!coleccionesPermitidas.includes(coleccion)) {
        return res.status(400).json({
            msg: `Esa coleccion no esta permitida, las que si estan son ${coleccionesPermitidas}`
        })
    }
    switch (coleccion) {
        case "usuarios":
            buscarUsuarios(termino, res)
            break;

        case "categorias":
            buscarCategorias(termino, res);
            break;

        case "productos":
            buscarProducto(termino, res);
            break;

        default:
            res.status(500).json({
                msg: "se me olvidó esta parte"
            })
            break;
    }

}
module.exports = {
    buscar
}