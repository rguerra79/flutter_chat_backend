const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const existeEmail = await Usuario.findOne({ email });

    if (existeEmail) {
      return res.status(400).json({
        ok: false,
        msg: 'El correo ya  está registrado',
      });
    }
    const usuario = new Usuario(req.body);

    // Encriptar contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    await usuario.save();

    // Generar JWT
    const token = await generarJWT(usuario.id);

    res.json({
      ok: true,
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, msg: 'Hable con el administrador' });
  }
};

const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const usuarioDB = await Usuario.findOne({ email });

    if (!usuarioDB) {
      return res.status(400).json({
        ok: false,
        msg: 'Email no registrado',
      });
    }

    // Generar JWT
    const token = await generarJWT(usuarioDB.id);

    res.json({
      ok: true,
      usuario: usuarioDB,
      token: token,
      //token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, msg: 'Hable con el administrador' });
  }
};

const renewToken = async (req, res = response) => {
  const uid = req.uid;

  // Generar un nuevo JWT
  const token = await generarJWT(uid);

  // Obtener el usuario por el UID
  const usuario = await Usuario.findById(uid);

  res.json({
    ok: true,
    uid: uid,
    usuario: usuario,
    token: token,
  });
};

module.exports = { crearUsuario, login, renewToken };
