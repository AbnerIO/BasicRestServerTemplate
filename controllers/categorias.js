const { response } = require("express");
const {Categoria}=require("../models")
//ObtenerCategorias - pagina - imprimir total , populate
const ObtenerCategorias = async(req, res) => {
    const {id}= res.params;

    console.log(id)
}
//ObtenerCategoria - regresar el objeto de la categoria, populate
//actualizarCategoria - recibe nombre
//borrarCategoria - convertir el estado a false
//Middleware para ver si el id existe categoria (si no existe mandalo a la verga) guia en helpers

const crearCategoria =async(req,res=response)=> {
    const nombre  = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({nombre});

    if(categoriaDB) {
        return res.status(401).json({
            msg: `La categoria ${nombre} ya existe`
        })
    }

    //generar los datos
    const data = {
        nombre,
        usuario : req.usuario._id
    }
    const categoria = new Categoria(data)

    //guardar db
    await categoria.save();

    res.status(201).json({
        categoria
    })
}

module.exports={crearCategoria};