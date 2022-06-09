const zmq = require('zeromq');
let cli = [], req = [], workers  = [];
let bc = zmq.socket('dealer');
let sw = zmq.socket('router');
bc.bind('tcp://localhost:9997');
sw.bind('tcp://localhost:9999');
bc.on('message',(c,sep,m)=> {
	if (workers.length==0) { 
		cli.push(c); req.push(m)
	} else {
		sw.send([workers.shift(),'',c,'',m])
	}
})
sw.on('message',(w,sep,c,sep2,r)=> {
    if (c=='') {workers.push(w); return}
	if (cli.length>0) { 
		sw.send([w,'',
			cli.shift(),'',req.shift()])
	} else {
		workers.push(w)
	}
	bc.send([c,'',r])
})

