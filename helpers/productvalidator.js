const Producto = require("../models/producto.js");

const existeProductoPorId = async(id)=>{
    const existeProducto = await Producto.findById(id);
    if (!existeProducto) {
        throw new Error("Esa Producto no existe");
    }
}
module.exports={
    existeProductoPorId
}
