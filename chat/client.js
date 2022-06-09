const zmq = require('zeromq')
const nick='Ono'
let sub = zmq.socket('sub') 
let psh = zmq.socket('push')
sub.connect('tcp://localhost:9998')
psh.connect('tcp://localhost:9999')
sub.subscribe('')
sub.on('message', (nick,m) => {
	console.log('['+nick+']'+m)
})
process.stdin.resume()
process.stdin.setEncoding('utf8')
process.stdin.on('data'  ,(str)=> {
	psh.send([nick, str.slice(0,-1)])
})
process.stdin.on('end',()=> {
	psh.send([nick, 'BYE'])
	sub.close(); psh.close()
})
process.on('SIGINT',()=> {
	process.stdin.end()
})
psh.send([nick,'HI'])
