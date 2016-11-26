var PORT=process.env.PORT || 3000;
var express=require('express');
var app=express();
var http=require('http').Server(app);
var io=require('socket.io')(http);
app.use(express.static(__dirname+"/public"));

io.on("connection",function(socket){
console.log("Connected via socket.io");


socket.emit("message",{
	type:"Message Send from server to client"
});

socket.on("message",function(message){
	console.log("message recieved :"+message.type);
	socket.broadcast.emit("message",message);
});
});
http.listen(PORT,function(){
	console.log("Server started");
});