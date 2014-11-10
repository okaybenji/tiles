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
    
    socket.on('requestReset', function() {
        io.emit('reset');
    });
    
    socket.on('requestAutoFill', function() {
        io.emit('autoFill');
    });
    
    socket.on('requestNextColor', function($index) {
        console.log('received request from',socket.handshake.address,'for next color for tile with index',$index);
        io.emit('nextColor', $index);
    });
    
});

http.listen(port, function(){
    console.log('listening on port',port);
});