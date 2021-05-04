const {Schema, model} = require("mongoose");

const UsuarioSchema = Schema({

    nombre: {
        type: String,
        required : [true, "El nombre no fue introducido"]
    },
    correo: {
        type: String,
        required : [true, "El nombre no fue introducido"],
        unique:true
    },
    password: {
        type: String,
        required : [true, "El nombre no fue introducido"]
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        required : true
    },
    estado: {
        type: Boolean,
        default:true
    },
    google: {
        type: Boolean,
        default:false
    }
    
});

//Purga la __v y password para ya no retornarlos (v no me sirve, password no se debe mandar )
UsuarioSchema.methods.toJSON = function () {
    const {__v, password, ...usuario} = this.toObject();
    return usuario;
}

module.exports= model("Usuario", UsuarioSchema);