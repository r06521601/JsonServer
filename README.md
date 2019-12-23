# JsonServer
the json server for quick demo.

# API Progress

ex: https://crcpjsondb.herokuapp.com/progress
Description: get progress status data
Method: GET
formdata:{
    Project:Latrobe
    AssetNumber:T3-003
    InspectionBy:jun wang
    InspectionDate:03/10/2019 10:55:10
    ProgressStatus:[0,1,0,0,0,0,0,0,0,0,1,0,0,0........]
 }
Notice:ProgressStatus need 22 binary 

ex: https://crcpjsondb.herokuapp.com/progress
Description: insert progress status data
Method: POST
formdata:{
    Project:Latrobe
    AssetNumber:T3-003
    InspectionBy:jun wang
    InspectionDate:03/10/2019 10:55:10
    ProgressStatus:[0,1,0,0,0,0,0,0,0,0,1,0,0,0........]
 }
Notice:ProgressStatus need 22 binary 



# API Inspection

ex: https://crcpjsondb.herokuapp.com/inspection
Description: get inspection data
Method: GET
formdata:{
    Project:Latrobe
    AssetNumber:T3-003
    InspectionBy:jun wang
    InspectionDate:03/10/2019 10:55:10
    FinalInspection:[[0, comment0],[1,comment1],[0,comment2]......]
    files:[file1, file2, file3......]
 }


ex: https://crcpjsondb.herokuapp.com/inspection
Description: insert inspection data
Method: POST
formdata:{
    Project:Latrobe
    AssetNumber:T3-003
    InspectionBy:jun wang
    InspectionDate:03/10/2019 10:55:10
    FinalInspection:[[0, comment0],[1,comment1],[0,comment2]......]
    files:[file1, file2, file3......]
 }
