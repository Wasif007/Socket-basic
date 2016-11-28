var name=getQueryVariable('name');
var room=getQueryVariable('room');

	var socket=io();
	console.log("Name is : "+name+" "+" joined chat room : "+room);
socket.on('connect',function()
{
console.log("User connected to server");
});

socket.on("message",function(message){
console.log("New message");
console.log(message.type);
var timestamp=moment.utc(message.time);
jQuery('.chatting').append('<p>'+ '<strong>'+timestamp.local().format("hh:mm a")+ ' </strong>'+" :"+message.type+'</p>');
});


//Sending messages to all except the one that has send it

var $form=jQuery('#wasif');
$form.on("submit",function(event){
event.preventDefault();

socket.emit("message",{
	type:$form.find('input[name=forms]').val()
});
$form.find('input[name=forms]').val('');
});
