const jwt = require("jsonwebtoken");
const { response, request } = require("express");
const Usuario = require("../models/usuario");
const validarJwt = async (req = request, res = response, next) => {
    const token = req.header("x-token");//header con el token
    if (!token) {
        return res.status(401).json({
            msg: "No hay token en la petición"
        })
    }

    try {

        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const usuario = await Usuario.findById(uid);
        if(!usuario) {
            return  res.status(401).json({
                msg: "Token no válido - Usuario no existe en DB"
            })
        }
        //verificar si el usuario con el uid(autenticado) tiene estado true
        if(!usuario.estado) {
            return res.status(401).json({
                msg: "Token no válido"
            })
        }
        req.usuario = usuario;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: "token no válido"
        })
    }
    console.log(token);
}
module.exports = {validarJwt}
