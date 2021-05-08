const jwt = require("jsonwebtoken");

const generarJWT = (uid="")=> {
    return new Promise ( (resolve, reject) => {
        const payload = { uid }; //lo que quiero grabar 
        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, { 
            expiresIn: "4h"
        }, (err, token) => {
            if (err) {
                console.log(err)
            }else{
                resolve(token);
            }
        });

    })
}

module.exports= {
    generarJWT
}