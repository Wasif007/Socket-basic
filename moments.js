var moment=require('moment');

var now=moment();
console.log(now.format('MMM Do YYYY, h:mma'));

console.log(now.format('x'));
var val=1480230803873;
var time=moment.utc(val);

console.log(time.local().format("h:mm a"));