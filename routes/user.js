const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos,
    validarJwt,
    esAdminRole,
    tieneRole } = require("../middlewares")

const { esRoleValido, emailExiste, existeUsuarioPorId } = require("../helpers/dbvalidators.js");

const { usersDelete,
    usersGet,
    usersPatch,
    usersPost,
    usersPut
} = require("../controllers/users.js");

const router = Router();

router.get('/', usersGet);

router.put('/:id', [
    check("id", "no es un ID válido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    check("rol").custom(esRoleValido),
    validarCampos
], usersPut);

router.post('/', [
    check("nombre", "El nombre no es válido").not().isEmpty(),
    check("password", "Debe ser mayor de 6 letras").isLength({ min: 6 }),
    check("correo", "El correo no es válido").isEmail(),
    check("correo").custom(emailExiste),
    check("rol").custom(esRoleValido),
    validarCampos
], usersPost);

router.delete('/:id', [
    validarJwt,
    //esAdminRole,
    tieneRole("VENTAS_ROLE", "ADMIN_ROLE"),
    check("id", "no es un ID válido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    validarCampos
], usersDelete)

router.patch('/', usersPatch);

module.exports = router;