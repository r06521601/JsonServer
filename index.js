var express = require('express');
var app = express();

app.get('/', function (req, res) {
   res.send('Hello World');
})
const PORT = process.env.PORT || 5001;

var server = app.listen(PORT, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})