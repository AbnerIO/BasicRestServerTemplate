const { response } = require("express");
const { Categoria } = require("../models")
//ObtenerCategorias - pagina - imprimir total , populate
const obtenerCategorias = async (req, res) => {

    const { limite = 5, desde = 0 } = req.query;

    const [categorias, total] = await Promise.all([
        Categoria.find({ estado: true }).skip(Number(desde))
            .limit(Number(limite)), Categoria.countDocuments({ estado: true })
    ])
    res.status(200).json({ total, categorias });
}
//ObtenerCategoria - regresar el objeto de la categoria, populate
const obtenerCategoria = async (req, res) => {
    const { id } = req.params;
    const categoriaDB = await Categoria.findById(id);

    res.status(201).json(categoriaDB)
}


//actualizarCategoria - recibe nombre
const actualizarCategoria = async (req, res) => {
    const nombre = req.body.nombre.toUpperCase();
    const usuario = req.header("x-token")
    const { id } = req.params;
    categoriaDB = await Categoria.findByIdAndUpdate(id,{nombre} )
    res.status(201).json({nombre, usuario, id, categoriaDB})
}

//borrarCategoria - convertir el estado a false
//Middleware para ver si el id existe categoria (si no existe mandalo a la verga) guia en helpers

const crearCategoria = async (req, res = response) => {
    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({ nombre });

    if (categoriaDB) {
        return res.status(401).json({
            msg: `La categoria ${nombre} ya existe`
        })
    }

    //generar los datos
    const data = {
        nombre,
        usuario: req.usuario._id
    }
    const categoria = new Categoria(data)

    //guardar db
    await categoria.save();

    res.status(201).json({
        categoria
    })
}

module.exports = { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria };