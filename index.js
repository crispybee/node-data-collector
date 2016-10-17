var server = require('http').createServer();
var io = require('socket.io')(server);
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

// database URL
var url = 'mongodb://localhost:27018/wifiscan';
var port = 3000;

var saveToDatabase = function(db, jsonData, callback) {

  // Get the wifiData collection
  var collection = db.collection('wifiData');

  // Insert data
  collection.insertOne(jsonData, function(err, result) {

  	console.log("Inserted object into wifiData collection");
  	callback(result);
  });
};

function addToMongoDB(jsonData) {
	// Use connect method to connect to the Server
	MongoClient.connect(url, function(err, db) {
		assert.equal(null, err);
		console.log("Connected correctly to server");

	  	saveToDatabase(db, jsonData, function () {
  			db.close();
  		});
  	});
}

io.on('connection', function(client) {
	console.log('A client connected.');

	client.on('injectWifiData', function(wifiData) {
		console.log('Received wifi data:\n');

		var jsonData = JSON.parse(wifiData);

		// Override timestamp with server timestamp to minimize time aberrations in the database
		jsonData.timestamp = Date.now();

		addToMongoDB(jsonData);
		console.log('Add object to database:\n');
		console.log(jsonData);
	});

	client.on('test', function (data) {
		console.log(data);
	});

	client.on('disconnect', function() {
		console.log('A client disconnected.');
	});
});
server.listen(port);

console.log('Started websocket server on port ' + port);