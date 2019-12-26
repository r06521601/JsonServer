# JsonServer
the json server for quick demo.

# API Progress


## Method: GET

Description: get progress status data


```javascript
ex: https://crcpjsondb.herokuapp.com/progress

formdata:{
    Project:Latrobe
    AssetNumber:T3-003
    CheckedBy:jun wang
    InspectionDate:03/10/2019 10:55:10
    ProgressStatus:[0,1,0,0,0,0,0,0,0,0,1,0,0,0........]
 }
 
Notice:ProgressStatus need 22 binary 

```


## Method: POST

Description: insert progress status data


```javascript
ex: https://crcpjsondb.herokuapp.com/progress

formdata:{
    Project:Latrobe
    AssetNumber:T3-003
    CheckedBy:jun wang
    InspectionDate:03/10/2019 10:55:10
    ProgressStatus:[0,1,0,0,0,0,0,0,0,0,1,0,0,0........]
 }
 
Notice:ProgressStatus need 22 binary 
```


# API Inspection


## Method: GET

Description: get inspection data


```javascript
ex: https://crcpjsondb.herokuapp.com/inspection

formdata:{
    Project:Latrobe
    AssetNumber:T3-003
    CheckedBy:jun wang
    InspectionDate:03/10/2019 10:55:10
    FinalInspection:[[0, comment0],[1,comment1],[0,comment2]......]
    files:[file1, file2, file3......]
 }
 ```

## Method: POST

Description: insert inspection data


```javascript
ex: https://crcpjsondb.herokuapp.com/inspection

formdata:{
    Project:Latrobe
    AssetNumber:T3-003
    CheckedBy:jun wang
    InspectionDate:03/10/2019 10:55:10
    FinalInspection:[[0, comment0],[1,comment1],[0,comment2]......]
    files:[file1, file2, file3......]
 }
 ```
