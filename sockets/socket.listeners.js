function onConnection(socket) { //Función en caso de recibir una conexión
    if(socket.recovered){
        console.log(`Reconnection from ${socket.id}`);
    }
    console.log('(%) onConnection', socket.id);
    socket.emit('message', `${socket.id} Se ha conectado al servidor`) //Mensaje dirigido a todos los clientes conectados.
  }
  module.exports.onConnection = onConnection;


  function onMessage(socket, message, callback) { //Función en caso de recibir un mensaje de un cliente
    console.log(`(%) onMessage from ${message}`);
    callback({ //Función callback para el cliente emisor
        status: 200,
        message: 'Mensaje recibido desde el servidor'
    })
    socket.emit('message', `${socket.id}: ${message}`) //Evento "message" dirigido a todos los clientes conectados.
  }
  module.exports.onMessage = onMessage;


  async function onDisconnect(socket) { //Función en caso de recibir una desconexión
    console.log('(%) onDisconnect from', socket.id);
    socket.broadcast.emit('message', `${socket.id} Ha sido desconectado del servidor`) //Evento "message" dirigido a todos los clientes conectados excepto al emisor (broadcast)
  }
  module.exports.onDisconnect = onDisconnect;