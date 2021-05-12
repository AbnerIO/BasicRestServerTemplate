const {response} = require("express");
const { Categoria } = require("../models/index.js");
const Producto = require("../models/producto.js");


const crearProducto = async (req, res = response) => {
    const nombre = req.body.nombre.toUpperCase();
    const category = req.body.categoria.toUpperCase();
    const productoDB = await Producto.findOne({ nombre });
    const categoria = await Categoria.findOne({nombre: category});
    if (!categoria) {
        return res.status(401).json({
            msg: `Esa categoría no existe: ${category}`
        })
    }
    if (productoDB) {
        return res.status(401).json({
            msg: `El Producto ${nombre} ya existe`
        })
    }

    //generar los datos
    const data = {
        nombre,
        usuario: req.usuario._id,
        categoria
    }
    const producto = new Producto(data);

    //guardar db
    await producto.save();

    res.status(201).json({
        producto
    })
}
module.exports={
    crearProducto
}
