/*

path: api/usuarios

*/

const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const {
  getUsuarios,
  getConectados,
  getDesconectados,
} = require('../controllers/usuarios');

const router = Router();

router.get('/', validarJWT, getUsuarios);
router.get('/online', validarJWT, getConectados);
router.get('/offline', validarJWT, getDesconectados);

module.exports = router;
