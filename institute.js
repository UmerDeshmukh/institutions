
function XrmWebApiCreateinstituteStaff(executionContext) 
{

    var formContext = executionContext.getFormContext();
    
    var institutename = prompt("Write the Institute Name:");
    var principalname = prompt("Write the Name of Principal:");
    

    var data1 =
    {
        "dat_name":  institutename ,
        "dat_staffinstitution" :
        {
            "dat_staffname" : principalname,
            
        }
               
      
    }
    
    // create student record
    if(institutename != null && principalname != null){
    Xrm.WebApi.createRecord("dat_institution", data1).then(
        function success(result) {
            console.log("Staff record created with ID: " + result.id);
            alert("Institute Created by Name" + institutename + "/n" + "And" + "/n" + "Staff Created by Name:" + principalname);
           // perform operations on record creation
           // XrmWebApiUpdate(executionContext,AccountId);
        },
        function (error) {
            console.log(error.message);
            // handle error conditions
        }
    );
    }
}

