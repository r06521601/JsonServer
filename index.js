var express = require('express');
const fs = require('fs');

var app = express();

app.get('/', function (req, res) {
   res.send('Hello World');
})

//ex: http://localhost:5001/database
app.get('/database', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');


    var contents = fs.readFileSync("db.json");
  
    var jsonContent = JSON.parse(contents);
    console.log(typeof(jsonContent.inspection))

  
    res.send(jsonContent);
    });

    function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }


//ex: http://localhost:5001/insert?id={value}
app.get('/insert', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');


    var contents = fs.readFileSync("db.json");

    var jsonContent = JSON.parse(contents);

    var tempData = new Array()

    for ( var index=0; index<jsonContent.inspection.length; index++ ) {
        tempData.push(jsonContent.inspection[index])
    }

    //push data
    tempData.push({
        "Project Name": getParameterByName("project", req.url),
        "Asset Number": getParameterByName("assetnumber", req.url),
        "Inspection Name": "Final Inspection",
        "Progress Status": getParameterByName("progressstatus", req.url),
        "Inspection By": getParameterByName("inspectionby", req.url),
        "Inspection Date": getParameterByName("inspectiondate", req.url)
    })

    //store
    jsonContent.inspection = tempData
    
    let data = JSON.stringify(jsonContent);

    console.log(data)

    fs.writeFileSync('db.json', data);

    res.send("done");
    })

    //ex: http://localhost:5001/delete
app.get('/delete', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');



    var back_contents = fs.readFileSync("jj.json");
  
    var jsonContent = JSON.parse(back_contents);
    let data = JSON.stringify(jsonContent);


    fs.writeFileSync('db.json', data);

  
    res.send("clean");
    });

const PORT = process.env.PORT || 5001;

var server = app.listen(PORT, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})