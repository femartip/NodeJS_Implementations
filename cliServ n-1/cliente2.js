const zmq = require('zeromq')
let s = zmq.socket('req')
s.connect('tcp://localhost:9998')
//s.send('dos')
s.on('message', (msg) => {
  console.log('Recibido: '+msg)
  //s.close()
})
setInterval(() => {s.send('dos')}, 1000)