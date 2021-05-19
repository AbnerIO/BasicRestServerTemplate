const {Router} = require("express");
const {check} = require("express-validator");
const {coleccionesPermitidas, archivoSeSubio} = require("../helpers");
const {validarCampos} = require("../middlewares/validar-campos.js");
const { cargarArchivo, actualizarImagen, mostrarImagen, actualizarImagenCloudinary } = require("../controllers/uploads.js");

const router = Router();

router.post("/",[
    archivoSeSubio,
    validarCampos
],
cargarArchivo);

router.put("/:coleccion/:id",[
    archivoSeSubio,
    check("id", "no es un id de mongo").isMongoId(),
    check("coleccion").custom(c=>coleccionesPermitidas(c,["usuarios", "productos"])),
    validarCampos
],/* actualizarImagen */ actualizarImagenCloudinary);
router.get("/:coleccion/:id",[
    check("id", "no es un id de mongo").isMongoId(),
    check("coleccion").custom(c=>coleccionesPermitidas(c,["usuarios", "productos"])),
    validarCampos
],mostrarImagen);








module.exports=router;