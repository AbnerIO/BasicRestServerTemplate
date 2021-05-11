const { response } = require("express");
const { Categoria } = require("../models")

const obtenerCategorias = async (req, res) => {

    const { limite = 5, desde = 0 } = req.query;

    const [categorias, total] = await Promise.all([
        Categoria.find({ estado: true }).populate("usuario", "nombre").skip(Number(desde))
            .limit(Number(limite)), Categoria.countDocuments({ estado: true })
    ])
    res.status(200).json({ total, categorias });
}
//ObtenerCategoria - regresar el objeto de la categoria, populate
const obtenerCategoria = async (req, res) => {
    const { id } = req.params;
    const categoriaDB = await Categoria.findById(id).populate("usuario", "nombre");

    res.status(201).json(categoriaDB)
}


//actualizarCategoria - recibe nombre
const actualizarCategoria = async (req, res) => {

    const { id } = req.params;
    const {estado, usuario, ...data} = req.body;

    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    const categoria = await Categoria.findOneAndUpdate(id, data, {new:true});
    res.status(201).json({
        categoria
    })

   
}

//borrarCategoria - convertir el estado a false
const borrarCategoria = async (req, res) => {
    const usuario = req.header("x-token")
    const { id } = req.params;
    categoriaDB = await Categoria.findByIdAndUpdate(id, { estado: false })
    res.status(201).json({ usuario, id, categoriaDB })
}

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

module.exports = { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria, borrarCategoria };