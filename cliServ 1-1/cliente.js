const zmq = require('zeromq')
let s = zmq.socket('req')
s.connect('tcp://localhost:9999')
s.send('Alex')
s.on('message', (msg) => {
  console.log('Recibido: '+msg)
  s.close()
})
