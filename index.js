var server = require('http').createServer();
var io = require('socket.io')(server);
var MongoClient = require('mongodb').MongoClient, assert = require('assert');

var saveToDatabase = function(db, jsonData, callback) {

  // Get the wifiData collection
  var collection = db.collection('wifiData');

  // Insert data
  collection.insertMany(jsonData, function(err, result) {

    console.log("Inserted object into wifiData collection");
    callback(result);
  });
};

// Connection URL
var url = 'mongodb://localhost:27017/wifiscan';

// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server");

  var phoneNameString = "phone1";
  var timestampString = Date.now();
  var roomNameString = "Mensa";
  var accessPointsDistance = [
    {eduroam: 2.7},
    {eduroam: 5.2},
    {eduroam: 22.4}
  ];

  var jsonData = [{
    "phoneName" : phoneNameString,
    "timestamp" : timestampString,
    "roomName" : roomNameString,
    "accessPoints": accessPointsDistance
  }];

  saveToDatabase(db, jsonData, function () {
  	db.close();
  });
});


io.on('connection', function(client) {
	console.log('Connected');
	io.emit('Success', client);

	client.on('event', function(data) {
		console.log('Event');
	});
	client.on('disconnect', function() {
		console.log('disconnect');
	});
});
server.listen(3000);

console.log('Started websocket server');