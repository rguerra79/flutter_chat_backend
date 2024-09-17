/*

path: api/login

*/

const { Router } = require('express');
const { check } = require('express-validator');

const { crearUsuario, login, renewToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post(
  '/new',
  [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('password', 'El password debe ser al menos de 5 caracteres')
      .not()
      .isEmpty()
      .isLength({ min: 5 }),
    check('email', 'El correo no es válido').isEmail(),
    //check('password', 'El password minimo 3 caracteres').length < 4,
    validarCampos,
  ],
  crearUsuario
);

router.post(
  '/',
  [
    check('email', 'El email es obligatorio').not().isEmpty(),
    check('email', 'El correo no es válido').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('password', 'El password debe ser al menos de 5 caracteres')
      .not()
      .isEmpty()
      .isLength({ min: 5 }),
    validarCampos,
  ],
  login
);

router.get('/renew', validarJWT, renewToken);

module.exports = router;
