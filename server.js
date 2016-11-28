var PORT=process.env.PORT || 3000;
var express=require('express');
var app=express();
var http=require('http').Server(app);
var io=require('socket.io')(http);
var moment=require('moment');
app.use(express.static(__dirname+"/public"));
var clientrequest={};

io.on("connection",function(socket){
console.log("Connected via socket.io");
var times=moment().valueOf();

socket.on("joinroom",function(req){
clientrequest[socket.id]=req;
socket.join(req.room);
socket.broadcast.to(req.room).emit("message",{
type:req.name+" "+" has joined!",
time:times,
name:"System"
});
});

socket.emit("message",{
	type:"Welcome to Chat Application",
	name:"System",
	time:times

	
});

socket.on("message",function(message){
	console.log("message recieved :"+message.type);
	message.time=moment().valueOf();
	io.to(clientrequest[socket.id].room).emit("message",message);
});
});
http.listen(PORT,function(){
	console.log("Server started");
});