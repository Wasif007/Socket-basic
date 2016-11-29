var name=getQueryVariable('name') || 'anonymous';
var room=getQueryVariable('room');

	var socket=io();
	console.log("Name is : "+name+" "+" joined chat room : "+room);
	jQuery('.room-name').text(room);
socket.on('connect',function()
{
console.log("User connected to server");
});

socket.emit("joinroom",{
name:name,
room:room
});

socket.on("message",function(message){
console.log("New message");
console.log(message.type);
var $messages=jQuery('.chatting');
var $messageq=jQuery('<li class="list-group-item" ></li>')
var timestamp=moment.utc(message.time);
$messageq.append('<p><strong>'+message.name+" : "+timestamp.local().format("hh:mm a")+'</strong></p>');
$messageq.append('<p>'+message.type+'</p>');
$messages.append($messageq);
});


//Sending messages to all except the one that has send it

var $form=jQuery('#wasif');
$form.on("submit",function(event){
event.preventDefault();

socket.emit("message",{
	name:name,
	type:$form.find('input[name=forms]').val()
});
$form.find('input[name=forms]').val('');
});
