const { response, request } = require("express");
const {googleVerify} = require("../helpers/google-verify.js")
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
        //Verificar si el usuario esta activo
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

const googleSignIn = async(req, res = response)=> {

    const {id_token} = req.body;
    try {
    const {correo, nombre, img} = await googleVerify(id_token);
    
    let usuario = await Usuario.findOne({correo});

    if (!usuario) {
        const data = {
            nombre,
            correo,
            img,
            password: ":p",
            google:true
        };
        usuario = new Usuario(data);
        await usuario.save();
    }

    //si el usuario en DB esta bloqueado
    if(!usuario.estado) {
        return res.status(401).json({
            msg: "Hable con el administrador, usuario bloqueado"
        })
    }

    //generar jwt
    const token = await generarJWT(usuario.id);
    res.json({
            usuario,
            token
    })
    
} catch (error) {
    res.status(400).json({
        msg:"Token de Google no es válido",
    })
}


}
module.exports = {
    login,
    googleSignIn
};
