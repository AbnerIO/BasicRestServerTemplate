const express = require('express');
const cors = require("cors");
const { dbConection } = require('../db/config.js');
const fileUpload =require("express-fileupload");

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths= {
            usuarios: "/api/usuarios",
            categorias: "/api/categorias",
            buscar: "/api/buscar",
            productos: "/api/productos",
            auth: "/api/auth",
            uploads: "/api/uploads"
        }


        //Conectar a la base de datos
        this.conectarDB();
        //Middleware
        this.middlewares();
        //Rutas
        this.routes();


    }
    async conectarDB() {
        await dbConection();
    }
    middlewares() {

        //Cors
        this.app.use(cors());
        //Lectura y parseo del body que me envian como res
        this.app.use(express.json());
        //Directorio publico
        this.app.use(express.static("public"));

        //fileUpload 
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir :"/tmp/",
            createParentPath: true
          }));

    }


    routes() {
        this.app.use(this.paths.auth, require("../routes/auth.js"));
        this.app.use(this.paths.buscar, require("../routes/buscar.js"));
        this.app.use(this.paths.categorias, require("../routes/categorias.js"));
        this.app.use(this.paths.usuarios, require("../routes/user.js"));
        this.app.use(this.paths.productos, require("../routes/productos.js"));
        this.app.use(this.paths.uploads, require("../routes/uploads.js"));
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log("Servidor ejecutandose es el puerto: ", this.port)
        })
    }
}
module.exports = Server;