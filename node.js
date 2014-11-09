var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = 8080;

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.use(express.static(__dirname + '/'));

io.on('connection', function(socket) {
    console.log('user connected with IP',socket.handshake.address);
});

http.listen(port, function(){
    console.log('listening on port',port);
});