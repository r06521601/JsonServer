var express = require('express');
const fs = require('fs');

var app = express();

app.get('/', function (req, res) {
   res.send('Hello World');
})

app.get('/database', function (req, res) {
    var contents = fs.readFileSync("db.json");
  
    var jsonContent = JSON.parse(contents);
  
    res.send(jsonContent);
    });

const PORT = process.env.PORT || 5001;

var server = app.listen(PORT, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})