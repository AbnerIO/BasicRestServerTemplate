const { response, request } = require("express");
const bcryptjs = require("bcryptjs");
const Usuario = require("../models/usuario.js");
const validarCampos = require("../middlewares/validar-campos.js");
const {generarJWT} = require("../helpers/generarjwt.js");

const login = async (req, res = response) => {
    const { correo, password } = req.body;
    try {
        //Verificar si el correo existe
        const usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            return res.status(400).json({
                msg: "El usuario / password no son correctos",
            });
        }
        //Verificar si el usuario estpa activo
        if (!usuario.estado) {
            return res.status(400).json({
                msg: "El usuario está inactivo",
            });
        }
        //Verificar la contraseña
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: "El usuario / password no son correctos",
            });
        }
        //Generar el JWT
        const token = await generarJWT(usuario.id);

        res.json({
            usuario, 
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Contacte al administrador",
        });
    }
};

module.exports = {
    login,
};
