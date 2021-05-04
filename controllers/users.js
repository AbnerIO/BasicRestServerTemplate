const { response, request } = require("express");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/usuario.js");


const usersGet = async (req = request, res = response) => {
  //Devolver los datos de nuestra base de datos, paginacion.
  const { limite = 5, desde = 0 } = req.query;
  /* await hace codigo bloqueante, esto seria util si una depende de la otra, pero no es el caso
  const usuarios = await Usuario.find({estado : true})
  .skip(Number(desde))
  .limit(Number(limite));
  const total = await Usuario.countDocuments({estado : true});*/
  const [usuarios, total] = await Promise.all([
    Usuario.find({ estado: true }).skip(Number(desde))
      .limit(Number(limite)), Usuario.countDocuments({ estado: true })
  ])
  res.status(200).json({ total, usuarios });
}
const usersPatch = (req = request, res = response) => {
  res.status(403).json({
    msg: "Patch - controller"
  })
}

const usersDelete = async(req, res) => {
  const {id} = req.params;

  /*eliminar a la fuerza const {id} = await Usuario.findByIdAndDelete(id)*/
  const usuario = await Usuario.findByIdAndUpdate(id, {estado:false})
  res.status(403).json({
    usuario
  })
}



const usersPost = async (req, res) => {
  //agarrar obligatoriamente el body que me mande
  const { nombre, password, rol, correo } = req.body;
  const usuario = new Usuario({ nombre, password, rol, correo });
  //Encriptar contraseña
  const salt = bcrypt.genSaltSync();
  usuario.password = bcrypt.hashSync(password, salt);
  //Gudardar en DB
  await usuario.save();
  res.status(200).json({
    usuario
  })
}
const usersPut = async (req, res) => {
  const { id } = req.params;
  const { password, google, correo, _id, ...resto } = req.body;
  //TODO validar contra la base de datos
  if (password) {
    //Encriptar contraseña
    const salt = bcrypt.genSaltSync();
    resto.password = bcrypt.hashSync(password, salt);
  }

  const usuario = await Usuario.findByIdAndUpdate(id, resto);
  res.json(usuario);
}
module.exports = {
  usersDelete,
  usersGet,
  usersPatch,
  usersPost,
  usersPut
}