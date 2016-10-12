var server = require('http').createServer();
var io = require('socket.io')(server);


io.on('connection', function(client) {
	console.log('Connected');

	client.on('event', function(data) {
		console.log('Event');
	});
	client.on('disconnect', function() {
		console.log('disconnect');
	});
});
server.listen(3000);

console.log('Started websocket server');