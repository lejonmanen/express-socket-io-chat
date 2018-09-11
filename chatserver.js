const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http)
/*app.on('request', (req, res) => {
	console.log('server received request');
})*/
app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html')
})

io.on('connection', function(socket){
	console.log('a user connected');
	//socket.broadcast.emit('New user connected');
	socket.on('disconnect', function(){
		console.log('user disconnected');
	});
	socket.on('chat message', function(msg){
		console.log('message: ' + msg);
		io.emit('chat message', msg);
	});
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
console.log('Server listening on port 3000');
