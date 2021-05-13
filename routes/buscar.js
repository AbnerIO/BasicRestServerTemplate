const {Router} = require("express");
const {buscar} = require("../controllers/buscar.js");
const { route } = require("./user.js");
router = Router();

router.get("/:coleccion/:termino", buscar)
module.exports=router