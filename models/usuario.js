const {Schema, model} = require("mongoose");

const UsuarioSchema = Schema({

    nombre: {
        type: String,
        required : [true, "El nombre no fue introducido"]
    },
    correo: {
        type: String,
        required : [true, "El correo no fue introducido"],
        unique:true
    },
    password: {
        type: String,
        required : [true, "La contraseña no fue introducida"]
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        default:"USER_ROLE",
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
    const {__v, password,_id, ...usuario} = this.toObject();
    usuario.uid = _id;
    return usuario;
}

module.exports= model("Usuario", UsuarioSchema);