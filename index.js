var express = require('express');
const fs = require('fs');
const bodyParser    = require('body-parser')


var app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

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


var multer  = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, __dirname + '/public/uploads/' );
    },
    filename: function (req, file, callback) {
      callback(null, Date.now()+file.originalname);
    }
  });

var upload = multer({ storage : storage }).array('files',20);

//ex: http://localhost:5001/insert
//Method: POST
//formdata:{
    // project:Latrobe
    // assetnumber:T3-003
    // progressstatus:19. Installation of lifting jig to pod
    // inspectionby:jun wang
    // inspectiondate:03/10/2019 10:55:10
    // array:0,0,0,0,1............
    // files:[file1, file2, ....... ]
// }

app.post('/insert', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    upload(req,res,function(err) {
        console.log(req.body);
        console.log(req.files);//[file1, file2, file3......] -> req.files[0].filename
        

        if(err) {
            return res.end("Error uploading file.");
        }

        var contents = fs.readFileSync("db.json");

        var jsonContent = JSON.parse(contents);

        var tempData = new Array()

        for ( var index=0; index<jsonContent.inspection.length; index++ ) {
            tempData.push(jsonContent.inspection[index])
        }

        //push data
        tempData.push({
            "Project Name": req.body.project,
            "Asset Number": req.body.assetnumber,
            "Inspection Name": "Final Inspection",
            "Progress Status": req.body.progressstatus,
            "Inspection By": req.body.inspectionby,
            "Inspection Date": req.body.inspectiondate
        })

        //store
        jsonContent.inspection = tempData

        let data = JSON.stringify(jsonContent);

        // console.log(data)

        fs.writeFileSync('db.json', data);

        res.send("done");
    });

    })


//////////////////////////////////////////////////////////
//// API Progress
//////////////////////////////////////////////////////////

//ex: https://crcpjsondb.herokuapp.com/progress
//Description: get progress status data
//Method: GET
//formdata:{
    // Project:Latrobe
    // AssetNumber:T3-003
    // CheckedBy:jun wang
    // InspectionDate:03/10/2019 10:55:10
    // ProgressStatus:[0,1,0,0,0,0,0,0,0,0,1,0,0,0........]
// }
//Notice:ProgressStatus need 22 binary 

app.get('/progress', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');


    var contents = fs.readFileSync("progress.json");
  
    var jsonContent = JSON.parse(contents);
    console.log(typeof(jsonContent.progress))

  
    res.send(jsonContent);
    });

//ex: https://crcpjsondb.herokuapp.com/progress
//Description: insert progress status data
//Method: POST
//formdata:{
    // "Project": LaTrobe,
    // "Asset Number": T1-001,
    // "Progress Status": 12,
    // "Work Progress":G, //0, 25, 50, 75, 100, G
    // "Checked By": Jun,
    // "Inspection Date": 03/10/2019 10:55:10,
    // "Double Task":[{
    // "Progress Status": 12,
    // "Work Progress":G, //0, 25, 50, 75, 100, G
    // }]
// }
//Notice:ProgressStatus need 22 binary 

app.post('/progress', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    upload(req,res,function(err) {

        var contents = fs.readFileSync("progress.json");

        var jsonContent = JSON.parse(contents);

        var tempData = new Array()

        //remove repeat data
        for ( var index=0; index<jsonContent.progress.length; index++ ) {
            if(jsonContent.progress[index]['Project'] == req.body.Project && jsonContent.progress[index]['Asset Number'] == req.body.AssetNumber)
            {
                console.log('bye repeat guy')
            }
            else{
                tempData.push(jsonContent.progress[index])
            }
        }


        //push data
        tempData.push({
            "Project": req.body.Project,
            "Asset Number": req.body.AssetNumber,
            "Progress Status": req.body.ProgressStatus,
            "Work Progress":req.body.WorkProgress,
            "Checked By": req.body.CheckedBy,
            "Inspection Date": req.body.InspectionDate,
        })
        if(req.body.DoubleTask['ProgressStatus'])
        {
            tempData.push({
                "Project": req.body.Project,
                "Asset Number": req.body.AssetNumber,
                "Progress Status": req.body.DoubleTask['ProgressStatus'],
                "Work Progress":req.body.DoubleTask['WorkProgress'],
                "Checked By": req.body.CheckedBy,
                "Inspection Date": req.body.InspectionDate,
            })
        }

        if(req.body.ThreeTask['ProgressStatus'])
        {
            tempData.push({
                "Project": req.body.Project,
                "Asset Number": req.body.AssetNumber,
                "Progress Status": req.body.ThreeTask['ProgressStatus'],
                "Work Progress":req.body.ThreeTask['WorkProgress'],
                "Checked By": req.body.CheckedBy,
                "Inspection Date": req.body.InspectionDate,
            })
        }

        //store
        jsonContent.progress = tempData

        let data = JSON.stringify(jsonContent);

        fs.writeFileSync('progress.json', data);

        res.send("done");
    });

    })




//////////////////////////////////////////////////////////
//// API Inspection
//////////////////////////////////////////////////////////

//ex: https://crcpjsondb.herokuapp.com/inspection
//Description: get inspection data
//Method: GET
//formdata:{
    // Project:Latrobe
    // AssetNumber:T3-003
    // CheckedBy:jun wang
    // InspectionDate:03/10/2019 10:55:10
    // FinalInspection:[[0, comment0],[1,comment1],[0,comment2]......]
    // files:[file1, file2, file3......]
// }

app.get('/inspection', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');


    var contents = fs.readFileSync("inspection.json");
    
    var jsonContent = JSON.parse(contents);
    console.log(typeof(jsonContent.inspection))

    
    res.send(jsonContent);
    });

//ex: https://crcpjsondb.herokuapp.com/inspection
//Description: insert inspection data
//Method: POST
//formdata:{
    // Project:Latrobe
    // AssetNumber:T3-003
    // CheckedBy:jun wang
    // InspectionDate:03/10/2019 10:55:10
    // FinalInspection:[[0, comment0],[1,comment1],[0,comment2]......]
    // files:[file1, file2, file3......]
// }

app.post('/inspection', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    upload(req,res,function(err) {
        
        console.log(req.files);//[file1, file2, file3......] -> req.files[0].filename

        if(err) {
            console.log(err)
            return res.end("Error uploading file.");
        }

        var contents = fs.readFileSync("inspection.json");

        var jsonContent = JSON.parse(contents);

        var tempData = new Array()

        for ( var index=0; index<jsonContent.inspection.length; index++ ) {
            tempData.push(jsonContent.inspection[index])
        }

        var FilestempData = new Array()

        for ( var index=0; index<req.files.length; index++ ) {
            FilestempData.push(req.files[index].filename)
        }

        console.log(req.body.FinalInspection)

        //push data
        tempData.push({
            "Project": req.body.Project,
            "Asset Number": req.body.AssetNumber,
            "Files": FilestempData,
            "Checked By": req.body.CheckedBy,
            "Inspection Date": req.body.InspectionDate,
            "FinalInspection":req.body.FinalInspection
        })

        //store
        jsonContent.inspection = tempData

        let data = JSON.stringify(jsonContent);

        // console.log(data)

        fs.writeFileSync('inspection.json', data);

        res.send("done");
    });

    })

app.use('/public/uploads', express.static(__dirname + '/public/uploads'))


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