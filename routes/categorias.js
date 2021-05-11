const {Router} = require("express");
const {check} = require("express-validator");
const { crearCategoria, obtenerCategorias, obtenerCategoria } = require("../controllers/categorias");
const {existeCategoriaPorId}=require("../helpers/categoriavalidator.js");

const {validarJwt, validarCampos} = require("../middlewares");

const router = Router();


/*Obtener todas las categorias - publico */
router.get("/",obtenerCategorias)
/*Obtener una categoria por id - publico*/
router.get("/:id", [
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
router.put("/:id", (req,res)=> {
    res.json({
        msg: "actualizar"
    })
});
/*Borrar categoría - Admin*/
router.delete("/:id", (req,res)=> {
    res.json({
        msg: "Borrar"
    })
})
module.exports=router;