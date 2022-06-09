const zmq = require('zeromq')
let s = zmq.socket('rep')
s.bind('tcp://*:8001')
s.on('message', (nom) => {
  console.log('Serv2, '+nom)
  s.send('Hola, '+nom)
})
