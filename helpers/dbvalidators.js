const Role = require("../models/role.js");
const Usuario = require("../models/usuario.js");


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

module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId
};