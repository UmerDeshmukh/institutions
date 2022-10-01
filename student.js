// copying the number from guardian column to home phone column JS

function guardianNumberCopytoHomeNumber(executionContext)
{
	var formContext = executionContext.getFormContext();
	var guardianNumberLogicalName = formContext.getAttribute("dat_guardiannumber").getValue();
	var homePhoneLogicalName = formContext.getAttribute("dat_homephone");
	if (guardianNumberLogicalName)
	{
		homePhoneLogicalName.setValue(guardianNumberLogicalName);
		//
	}
}
//  Alert diolog box JS

function instituteDialogAlert(executionContext)
{
	var formContext = executionContext.getFormContext();
    
    var instituteNameLogicalName = formContext.getAttribute("dat_institutename").getValue();
    
    if (instituteNameLogicalName == null)
    {

        var alertStrings = {confirmButtonLabel: "OK",text: "Mention the Institute you are in",title: "Institute Name Alert"};
        var alertOptions = {height: 120,width: 360};

        Xrm.Navigation.openAlertDialog(alertStrings, alertOptions).then(

        function success(result)
        {
        setlookup(executionContext)
		console.log("Alert dialog closed");
        },

        function (error)
        {
		console.log(error.message);
        });
    }
}

function setlookup(executionContext)
{
    var formContext = executionContext.getFormContext();

    var lookupfield = new Array();
    lookupfield[0] = new Object();

    lookupfield[0].id = "56ddb96b-5123-ed11-b83e-000d3a34fc34";
    lookupfield[0].name = "Model English High School";
    lookupfield[0].entityType = "dat_institution";
    formContext.getAttribute("dat_institutename").setValue(lookupfield); 

}


// Confrimation Alert Dialog Box
//formContext.data.entity.save();//Save the record
//XrmWebApiCreate(executionContext,recordId); // web Api 
//var recordId = formContext.data.entity.getId().replace('{', '').replace('}', ''); // to get the guid of record 


function confirmAlertDialogue(executionContext)
{
    var formContext = executionContext.getFormContext();   
    var confirmStrings = {
		text: "Do you want to Save.",
		title: "Confirmation Dialog"
	};
	var confirmOptions = {
		height: 200,
		width: 450
	};
	Xrm.Navigation.openConfirmDialog(confirmStrings, confirmOptions).then(

	function (success)
	{
		if (success.confirmed){ 
            XrmWebApiCreateStudent1(executionContext) 
          //  XrmWebApiCreateStudent(executionContext) 
        console.log("Dialog closed using OK button.");}
		else {console.log("Dialog closed using Cancel button or X.");}
	});
}


function XrmWebApiCreateStudent(executionContext) 
{
    var formContext = executionContext.getFormContext();
    
    var data =
    {
        "dat_firstname": "New Student Firstname",
        "dat_lastname": "New Student Lastname ",
        "dat_guardiannumber": "987363663",
        "dat_class": "3",
        "dat_subject": "810630000",
        "dat_fulladdress": "This is the Address of web vpi student"
      
    }
    
    // create student record
    
    Xrm.WebApi.createRecord("dat_student", data).then(
        function success(result) {
            console.log("Student created with ID: " + result.id);
           // perform operations on record creation
           // XrmWebApiUpdate(executionContext,AccountId);
        },
        function (error) {
            console.log(error.message);
            // handle error conditions
        }
    );
}

function XrmWebApitretrieve(executionContext) 
{
    var formContext = executionContext.getFormContext();

    Xrm.WebApi.retrieveMultipleRecords("dat_student", "?$select=dat_firstname&$top=3").then(
        function success(result) {
        for (var i = 0; i < result.entities.length; i++) {
        console.log(result.entities[i]);
        alert ("Top three Records are:" + result.entities[i]);
        }
      
        // perform additional operations on retrieved records
        },
        function (error) {
        console.log(error.message);
        // handle error conditions
        }
    );
}


function XrmWebApiCreateStudent1(executionContext) 
{

    var formContext = executionContext.getFormContext();
    
    var firstname = prompt("Write the First Name:");
    var lastname = prompt("Write the Last Name:");


    var data =
    {
        "dat_firstname": firstname,
        "dat_lastname": lastname,              
      
    }
    
    // create student record
    
    Xrm.WebApi.createRecord("dat_student", data).then(
        function success(result) {
            console.log("Student created with ID: " + result.id);
           // perform operations on record creation        
        },
        function (error) {
            console.log(error.message);
            // handle error conditions
        }
    );
}

function retrieveinstitute(executionContext)
{
    debugger;
    formContext = executionContext.getFormContext();


    var accountValue = formContext.getAttribute("dat_accountname").getValue();

    var instituteName = formContext.getAttribute("dat_institutename");

   
    if ( accountValue != null)
    {
        var accountId = accountValue[0].id.slice(1, -1);        
        if (accountId !=null)
        {
        Xrm.WebApi.retrieveRecord("account", accountId , "?$select=_dat_institutename_value&$expand=dat_InstituteName($select=dat_name)").then(
        
        function success(result) {    

            var dat_institutenameid = result["_dat_institutename_value"]; // Lookup
            var dat_institutename = result["_dat_institutename_value@OData.Community.Display.V1.FormattedValue"];
            var dat_instituteEntity_lookuplogicalname = result["_dat_institutename_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
            

            // console.log("Retrieved values: Name: " + result.name + ", Primary Contact ID: " + result.dat_institutenameid +
            // ", Primary Contact Name: " + result.dat_institutenameid.dat_name  ,"Institute Formated Name" + dat_institutename_formatted );
        // perform operations on record retrieval

                    // Set the lookup value of the field                   
                    if(dat_institutenameid !=null)
                    {
                    instituteName.setValue([{
                        id: dat_institutenameid,
                        name: dat_institutename,
                        entityType: dat_instituteEntity_lookuplogicalname
                    }]);
                    }
            //formContext.getAttribute("dat_institutename").setValue(dat_institutename)[0].id;
        },
        function (error) {
        console.log(error.message);
        // handle error conditions
        }
        );
    }
    }
    else    
    {
        formContext.getAttribute("dat_institutename").setValue(null);
        
    }
}


function RetrieveANDFecthRecords() {    

    var studentFetchXML = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>"+
    "  <entity name='dat_student'>"+
    "    <attribute name='dat_studentid' />"+
    "    <attribute name='dat_firstname' />"+
    "    <attribute name='createdon' />"+
    "    <order attribute='dat_firstname' descending='false' />"+
    "    <link-entity name='dat_institution' from='dat_institutionid' to='dat_institutename' link-type='inner' alias='ad'>"+
    "      <filter type='and'>"+
    "        <condition attribute='dat_institutionid' operator='eq' uiname='National Urdu School' uitype='dat_institution' value='{9F111035-A238-ED11-9DB0-00224827E167}' />"+
    "      </filter>"+
    "    </link-entity>"+
    "  </entity>"+
    "</fetch>";
 
    studentFetchXML = "?fetchXml=" + encodeURIComponent(studentFetchXML);
 
    var outputText = "Full Name\t\t\tphone\t\t\tCompany  Name\n---------------------------------------------------\n";
    Xrm.WebApi.retrieveMultipleRecords("dat_student", studentFetchXML).then(
    function success(result) {
        for (var studentRecordsCount = 0; studentRecordsCount < result.entities.length; studentRecordsCount++) {
            outputText += result.entities[studentRecordsCount].dat_fullname + "\t\t" + result.entities[studentRecordsCount].dat_schoolid + result.entities[studentRecordsCount].dat_applicablefees + "\n";
        }
        Xrm.Utility.alertDialog(outputText, null);
    },
    function (error) {
        // Handle error conditions
        Xrm.Utility.alertDialog(error.message, null);
    });
}




