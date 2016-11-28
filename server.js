var PORT=process.env.PORT || 3000;
var express=require('express');
var app=express();
var http=require('http').Server(app);
var io=require('socket.io')(http);
var moment=require('moment');
app.use(express.static(__dirname+"/public"));
var clientrequest={};
var times=moment().valueOf();

function sendingUsers(socket)
{
var info=clientrequest[socket.id];
var users=[];
if(info ==='undefined')
{
	return;
}	
Object.keys(clientrequest).forEach(function(socketId)
{
var userInfo=clientrequest[socketId];
if(userInfo.room===info.room)
{
	users.push(userInfo.name);
}

});
socket.emit("message",{
type:"User are "+users.join(' , '),
time:times,
name:"System"
});
}

io.on("connection",function(socket){
console.log("Connected via socket.io");

socket.on("disconnect",function(){
var userData=clientrequest[socket.id];
	if(typeof  userData !== 'undefined')
	{
		socket.leave(userData.room);
		io.to(userData.room).emit('message',{
			type:userData.name+" has Left",
			time:times,
			name:"System"
		});
	}
	delete clientrequest[socket.id];
});

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
	if(message.type==='@currentuser')
{
sendingUsers(socket);
}else{
	message.time=moment().valueOf();
	io.to(clientrequest[socket.id].room).emit("message",message);
}
});
});
http.listen(PORT,function(){
	console.log("Server started");
});