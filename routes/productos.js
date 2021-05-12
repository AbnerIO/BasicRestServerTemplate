const {Router} = require("express");
const { crearProducto, obtenerProductos, obtenerProducto, actualizarProducto, borrarProducto } = require("../controllers/productos.js");
const {check} = require("express-validator");
const {validarJwt, validarCampos, esAdminRole} = require("../middlewares");
const { existeProductoPorId } = require("../helpers/dbvalidators.js");

const router = Router();


/*Obtener todos los productos - publico */
router.get("/",obtenerProductos)
/*Obtener un producto por id - publico*/
router.get("/:id",[
    check("id", "No es un id de mongo").isMongoId(),
    check("id").custom(existeProductoPorId),
    validarCampos
],obtenerProducto)
/*crear producto - privado-  cualquier persona con token id valido*/
router.post("/",[
    validarJwt,
    check("nombre", "el nombre es obligatorio").not().isEmpty(),
    check("categoria", "La categoria es obligatoria").not().isEmpty(),
    validarCampos
],crearProducto)
/*Actualizar producto - privado-  cualquier persona con token id valido*/
router.put("/:id",[
    validarJwt,
    check("id", "No es un id de mongo").isMongoId(),
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("id").custom(existeProductoPorId),
    validarCampos
],actualizarProducto)
/*Borrar producto - Admin*/
router.delete("/:id",[
    validarJwt,
    esAdminRole,
    check("id", "No es un id de mongo").isMongoId(),
    check("id").custom(existeProductoPorId),
    validarCampos
],borrarProducto)
module.exports=router;