const {Router} = require("express");
const {  usersDelete,
            usersGet,
            usersPatch,
            usersPost,
            usersPut
        } = require("../controllers/users.js")
const router = Router();

    router.get('/', usersGet );     
    router.put('/:id', usersPut);     
    router.post('/', usersPost);     
    router.delete('/', usersDelete );     
    router.patch('/', usersPatch);     

module.exports=router;