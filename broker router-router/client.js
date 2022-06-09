//Asincrono, solucion para poder equilibrar la carga. 
const zmq = require('zeromq')
let req = zmq.socket('req');
req.connect('tcp://localhost:9998')
console.log("Hola cliente")
req.on('message', (msg)=> {
	console.log('resp: '+msg)
	process.exit(0);
})
req.send('Hola')
