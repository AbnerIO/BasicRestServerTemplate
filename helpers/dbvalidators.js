const Role = require("../models/role.js");
const Usuario = require("../models/usuario.js");
const Categoria = require("../models/categoria.js");
const Producto = require("../models/producto.js");


const esRoleValido = async (rol = "") => {
    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
        throw new Error("Ese rol no está en la base de datos")
    }
}

const emailExiste = async (correo = "") => {
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
        throw new Error("Ese correo ya tiene una cuenta creada con anterioridad");
    }
}
const existeUsuarioPorId = async (id) => {
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario) {
        throw new Error("Ese usuario no existe");
    }
}

const existeCategoriaPorId = async (id) => {
    const existeCategoria = await Categoria.findById(id);
    if (!existeCategoria) {
        throw new Error("Esa Categoria no existe");
    }
}

const existeProductoPorId = async(id)=>{
    const existeProducto = await Producto.findById(id);
    if (!existeProducto) {
        throw new Error("Esa Producto no existe");
    }
}

/*
Validar colecciones permitidas
*/
const coleccionesPermitidas=(coleccion="",colecciones=[])=>{
    const incluida = colecciones.includes(coleccion);

    if(!incluida){
        throw new Error(`La coleccion ${coleccion} no es permitida: ${colecciones}`);
    }
    return true;
}
module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoriaPorId,
    existeProductoPorId,
    coleccionesPermitidas
};