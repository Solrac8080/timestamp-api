var express= require('express');
var moment = require('moment');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});

var monthNames= ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

app.use("",function (req, res) {
    var input = req.url.split('');
    input.shift();
    if (isNaN(input/2)){
        natural=input.join('').replace(/%20/g,' ');
        unix=moment(natural)/1000;
        date=new Date(Number(unix)*1000);
        natural = monthNames[date.getUTCMonth()]+" "+date.getUTCDate()+", "+date.getUTCFullYear();
        if (isNaN(unix)){
            unix = null;
            natural = null;
        }
        res.end('{"unix":'+unix+',"natural":"'+natural+'"}');
    }else{ 
        input.push("000");
        var date=new Date(Number(input.join('')));
        var natural = monthNames[date.getUTCMonth()]+" "+date.getUTCDate()+", "+date.getUTCFullYear();
        var unix = date.getTime()/1000;
        if (isNaN(unix)||isNaN(natural)){
            unix = null;
            natural = null;
        }
        res.end('{"unix":'+unix+',"natural":"'+natural+'"}');
    }
});