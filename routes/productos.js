const {Router} = require("express");
const { crearProducto, obtenerProductos, obtenerProducto } = require("../controllers/productos.js");
const {check} = require("express-validator");
const {validarJwt, validarCampos, esAdminRole} = require("../middlewares");
const { existeProductoPorId } = require("../helpers/productvalidator.js");

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
router.put("/:id",(req,res)=>{
    res.json({
        msg:"update"
    })
})
/*Borrar producto - Admin*/
router.delete("/:id",(req,res)=>{
    res.json({
        msg:"borra"
    })
})
module.exports=router;