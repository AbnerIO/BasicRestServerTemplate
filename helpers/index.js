const dbValidators = require("./dbvalidators.js");
const generarJWT = require("./generarjwt.js");
const googleVerify = require("./google-verify.js");
const subirArchivo = require("./subir-archivo.js");

module.exports={
    ...dbValidators,
    ...generarJWT,
    ...googleVerify,
    ...subirArchivo
}