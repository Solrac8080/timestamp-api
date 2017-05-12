var express= require('express');
var moment = require('moment');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!<br>Try adding a date to the end of the url like:'+"<br><a href='/May%2011,%202017'>https://test-solrac8080.c9users.io/May 11, 2017</a><br>or try unix time code like:<br><a href='/1494460800'>https://test-solrac8080.c9users.io/1494460800</a><br>or try adding anything to break it, then report it at <a href='https://github.com/Solrac8080/timestamp-api/issues/new'>github</a>.");
});

app.listen(process.env.PORT, function () {
  console.log('Example app listening on port 8080!');
});

var monthNames= ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

app.use("",function (req, res) {
    var input = req.url.split('');
    input.shift();
    if (isNaN(Number(input.join(''))/2)){
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
        if (isNaN(unix)){
            unix = null;
            natural = null;
        }
        res.end('{"unix":'+unix+',"natural":"'+natural+'"}');
    }
});
