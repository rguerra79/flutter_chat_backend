const { response } = require('express');
const Usuario = require('../models/usuario');

const getUsuarios = async (req, res = response) => {
  const desde = Number(req.query.desde) || 0;

  const usuarios = await Usuario.find({
    _id: { $ne: req.uid } /* , online: true */,
  })
    // $ne - not exist - devuelve todos los usuarios menos uid
    // .find() devuelve todos
    .sort('-online')
    .skip(desde)
    .limit(20); // el - ordena descendente

  res.json({
    ok: true,
    usuarios,
  });
};

const getConectados = async (req, res = response) => {
  const desde = Number(req.query.desde) || 0;

  const usuarios = await Usuario.find({ _id: { $ne: req.uid }, online: true })
    // $ne - not exist - devuelve todos los usuarios menos uid
    // .find() devuelve todos
    .sort('-online')
    .skip(desde)
    .limit(20); // el - ordena descendente

  res.json({
    ok: true,
    usuarios,
  });
};

const getDesconectados = async (req, res = response) => {
  const desde = Number(req.query.desde) || 0;

  const usuarios = await Usuario.find({ _id: { $ne: req.uid }, online: false })
    // $ne - not exist - devuelve todos los usuarios menos uid
    // .find() devuelve todos
    .sort('-online')
    .skip(desde)
    .limit(20); // el - ordena descendente

  res.json({
    ok: true,
    usuarios,
  });
};

module.exports = {
  getUsuarios,
  getConectados,
  getDesconectados,
};
