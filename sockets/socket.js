const { comprobarJWT } = require('../helpers/jwt');
const { io } = require('../index');
const {
  usuarioConectado,
  usuarioDesconectado,
  grabarMensaje,
} = require('../controllers/socket');
// Mensajes de Sockets
io.on('connection', (client) => {
  const [valido, uid] = comprobarJWT(client.handshake.headers['x-token']);

  if (!valido) {
    return client.disconnect();
  }

  // Cliente autenticado
  usuarioConectado(uid);

  /*
    Cuando un usuario se conecta hay 2 salas por defecto,
    una sala global donde estan todos los conectados y  
    una sala con el uid del usuario
  */
  // Ingresar al usuario a una sala en particular
  client.join(uid);

  // Escuchar del cliente el mensaje-personal
  client.on('mensaje-personal', async (payload) => {
    // Grabar mensaje
    await grabarMensaje(payload);
    io.to(payload.para).emit('mensaje-personal', payload);
  });

  client.on('disconnect', () => {
    usuarioDesconectado(uid);
  });

  /* client.on('mensaje', ( payload ) => {
        console.log('Mensaje', payload);

        io.emit( 'mensaje', { admin: 'Nuevo mensaje' } );

    }); */
});
