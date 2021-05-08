const  validarJwt  = require("../middlewares/validar-jwt.js");
const validarCampos = require("../middlewares/validar-campos.js");
const validaRoles = require("../middlewares/validar-roles.js");
module.exports= {
    ...validarCampos,
    ...validarJwt,
    ...validaRoles
}