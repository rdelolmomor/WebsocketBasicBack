const express = require('express');
const cors = require('cors');
const app = express();

//Levantamiento del servicio
const PORT = 5010;
const httpServer = app.listen(PORT, () => {
    console.log(' WEBSOCKETS BASICO BACKEND '.padStart(25, '-').padEnd(50, '-'));
    console.log(`$ Server listening on port *:${PORT}`);
});

app.use(cors());


const socketConfig = require('./sockets')(httpServer); //Creación del websocket mediante la libreria socket.io del servidor
socketConfig.init();//Llama a la funcion init del socket recien creado para que esté listo para escuchar los eventos
