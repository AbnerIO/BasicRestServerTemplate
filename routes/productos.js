const {Router} = require("express");
const { crearProducto, obtenerProductos } = require("../controllers/productos.js");
const {check} = require("express-validator");
const {validarJwt, validarCampos, esAdminRole} = require("../middlewares");

const router = Router();


/*Obtener todos los productos - publico */
router.get("/",obtenerProductos)
/*Obtener un producto por id - publico*/
router.get("/:id",(req,res)=>{
    res.json({
        msg:"get una"
    })
})
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