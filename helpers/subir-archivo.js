
const path=require("path")
const { v4: uuidv4 } = require('uuid');

const subirArchivo = ( files, extensionesValidas=["png", "jpg", "jpeg", "gif"],carpeta="" ) => {
    return new Promise((resolve, reject) => {

        const { archivo } = files;
        const nombreCortado = archivo.name.split(".");
        const extension = nombreCortado[nombreCortado.length - 1]

        //validar las extensiones
        if (!extensionesValidas.includes(extension)) {
           return reject( `La extension ${extension} no es permitida, ${extensionesValidas}`)
        }

        const nombreTemp = uuidv4() + "." + extension;

        const uploadPath = path.join(__dirname, "../uploads/",carpeta,  nombreTemp);

        archivo.mv(uploadPath, (err) => {
            if (err) {
                reject(err);
            }

            resolve(nombreTemp)
        });
    })

}

//middleware de que existe el archivo 
const archivoSeSubio =(req, res=response,next) => {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        res.status(400).json({ msg: 'No hay archivos que subir' });
        return;
    }

    next();
}

module.exports = {
    subirArchivo,
    archivoSeSubio
}