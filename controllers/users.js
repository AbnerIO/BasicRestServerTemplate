const {response, request}= require("express");

const usersGet = (req=request, res=response)=> {
  //agarrar las querys
  const query = req.query;
    res.status(403).json({
        msg: "Get - controller",
        query
    })
  }
const usersPatch = (req=request, res=response)=> {
    res.status(403).json({
        msg: "Patch - controller"
    })
  }
const usersDelete = (req, res)=> {
    res.status(403).json({
        msg: "Delete - Controller"
    })
  }
const usersPost = (req, res)=> {
  //agarrar obligatoriamente el body que me mande
  const {nombre, edad} = req.body;
    res.status(403).json({
        msg: "Post - Controller",
        nombre,
        edad
    })
  }
const usersPut= (req, res)=> {
  const id = req.params.id;
    res.status(403).json({
        msg: "Put - Controller",
        id
    })
  }
  module.exports= {
      usersDelete,
      usersGet,
      usersPatch,
      usersPost,
      usersPut
  }