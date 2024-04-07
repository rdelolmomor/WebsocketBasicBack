const socketServer = require('socket.io');
const listeners = require('./socket.listeners');//Listeners para los distintos eventos de socket

const cors = {
  origin: '*',
  methods: ['GET', 'POST'],
};

function socketInit(httpServer) {
  const io = socketServer(httpServer, { cors }); //Inicialización del socket

  //Listeners para los distintos eventos de socket
  return {
    io,
    init: () => {
      io.on('connection', socket => { //Listener para el evento "connection", este listener engloba el resto de listeners de eventos que puedan producirse.
        listeners.onConnection(socket);
        socket.on('message', (message, callback) => //Listener para el evento "message"
          listeners.onMessage(socket, message, callback)
        );
        socket.on('reconnect',(attempt) => {
            console.log(attempt)
        });
        socket.on('disconnecting', () => //Listener para el evento "disconnecting".
          listeners.onDisconnect(socket)
        );
      });
    },
  };
}

module.exports = socketInit;