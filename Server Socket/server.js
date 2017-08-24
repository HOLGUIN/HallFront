var express = require('express');
var app = new express();
var http    = require('http').Server(app);
var io = require('socket.io')(http);

var port = process.env.PORT || 3002;

app.use(express.static(__dirname + '/'));

//app.get('/', function(req, res){
//    res.sendfile('index.html');
//});

io.on('connection', function(socket){
  console.log("we have a connection");
  socket.on("new-message", function(msg){
    console.log(msg);
    io.emit("receive-message", msg);
  })
});

http.listen(port, function(){
  console.log("we are connected");
});