const zmq = require('zeromq');
let sc = zmq.socket('router');
let bs = zmq.socket('router');
sc.bind('tcp://localhost:9998');
bs.bind('tcp://localhost:9997');
sc.on('message', (c,sep,msg) => {
    bs.send([c,'',msg]);
})
bs.on('message', (c,sep,rep) => {
    sc.send([c,'',rep]);
})


