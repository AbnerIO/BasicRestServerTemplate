const {Router} = require("express");
const {check} = require("express-validator");
const { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria, borrarCategoria } = require("../controllers/categorias");
const {existeCategoriaPorId}=require("../helpers/dbvalidators.js");

const {validarJwt, validarCampos, esAdminRole} = require("../middlewares");

const router = Router();


/*Obtener todas las categorias - publico */
router.get("/",obtenerCategorias)
/*Obtener una categoria por id - publico*/
router.get("/:id", [
    check("id", "No es un id de mongo").isMongoId(),
    check("id").custom(existeCategoriaPorId),
    validarCampos
],obtenerCategoria)
/*crear categoria - privado-  cualquier persona con token id valido*/
router.post("/", [
    validarJwt,
    check("nombre", "el nombre es obligatorio").not().isEmpty(),
    validarCampos
],crearCategoria)
/*Actualizar categoría - privado-  cualquier persona con token id valido*/
router.put("/:id",[
    validarJwt,
    check("id", "No es un id de mongo").isMongoId(),
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("id").custom(existeCategoriaPorId),
    validarCampos
] ,actualizarCategoria);
/*Borrar categoría - Admin*/
router.delete("/:id",[
    validarJwt,
    check("id", "No es un id de mongo").isMongoId(),
    check("id").custom(existeCategoriaPorId),
    esAdminRole,
    validarCampos
] , borrarCategoria)
module.exports=router;