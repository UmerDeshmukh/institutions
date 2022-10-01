//Get and Set a Single Line of Text field value

function SingleLineOfTextFieldValue(executionContext)
{
	debugger;
	//Get the context of the form
	var formContext = executionContext.getFormContext();
	//The logical name of the field of interest
	var accountNumberFieldLogicalName = "accountnumber";
	//Access the field on the form
	var accountNumberField = formContext.getAttribute(accountNumberFieldLogicalName);
	//var accountNumberField = formContext.getAttribute("accountnumber");
	//Declare the other variables as needed
	var accountNumberFieldValue;
	//Check that field exist on the form before you try to Get/Set its value
	if (accountNumberField != null)
	{
		// Get the value of the field
		accountNumberFieldValue = accountNumberField.getValue();
		if (accountNumberFieldValue == null)
		{
			// Set the value of the field
			accountNumberField.setValue("BYA-2019-AIR-1000");
		}
	}
}
//Get and Set a Option Set field value

function OptionsetFieldValue(executionContext)
{
	//Get the context of the form
	var formContext = executionContext.getFormContext();
	//The logical name of the field of interest
	var relationShipTypeFieldLogicalName = "customertypecode";
	// Access the field on the form
	var relationShipTypeField = formContext.getAttribute(relationShipTypeFieldLogicalName);
	//Declare the other variables as needed
	var relationShipTypeValue;
	//Check that field exist on the form before you try to Get/Set its value
	if (relationShipTypeField != null)
	{
		// Get the value of the field
		relationShipTypeValue = relationShipTypeField.getValue();
		// Set the value of the field to FALSE
		relationShipTypeField.setValue(5);
	}
}

function formNotification(executionContext)
{
	var formContext = executionContext.getFormContext();
	formContext.ui.setFormNotification("This is INFO", INFO, 100);
	formContext.ui.setFormNotification("This is ERROR", ERROR, 101);
	formContext.ui.setFormNotification("This is WARNING", WARNING, 102);
}

function alertDialogue(executionContext)
{
	var alertStrings = {
		confirmButtonLabel: "Yes",
		text: "This is an alert.",
		title: "Sample title"
	};
	var alertOptions = {
		height: 120,
		width: 260
	};
	Xrm.Navigation.openAlertDialog(alertStrings, alertOptions).then(

	function (success)
	{
		console.log("Alert dialog closed");
	},

	function (error)
	{
		console.log(error.message);
	});
}

function confirmAlertDialogue(executionContext)
{
	var confirmStrings = {
		text: "This is a confirmation.",
		title: "Confirmation Dialog"
	};
	var confirmOptions = {
		height: 200,
		width: 450
	};
	Xrm.Navigation.openConfirmDialog(confirmStrings, confirmOptions).then(

	function (success)
	{
		if (success.confirmed) 
        XrmWebApiCreate(executionContext);
         console.log("Dialog closed using OK button.");
		else console.log("Dialog closed using Cancel button or X.");
	});
}


function formtype(executionContext)
{
	var formContext = executionContext.getFormContext();
	var formType = formContext.ui.getFormType();
	alert(formType);
}


function phoneNumberCopytoFax(executionContext)
{
	var formContext = executionContext.getFormContext();
    
    var phoneNumberLogicalName = formContext.getAttribute("telephone1").getValue();
    
    var faxLogicalName = formContext.getAttribute("fax");
    
    if(phoneNumberLogicalName != null)
    
    {
       faxLogicalName.setValue(phoneNumberLogicalName);
    }
    
}


function XrmWebApiCreate(executionContext) {
debugger;
    // define the data to create new account
    var AccountId;
    //var AccountObj = null;
    var data =
    {
        "name": "Web API ",
        "telephone1": "987363663",
        "websiteurl": "WWW.Google.com",
        "description": "This is the description of the sample account",
        "customertypecode": 5,
        "address1_line1": "This is the Address line of the sample account"
      
    }

    // create the contact object
    //AccountObj = new Object();
    //AccountObj.name = "Web API Sample Account ";
    //AccountObj.creditonhold = false;
    //AccountObj.address1_latitude = 47.639583;

    ////set optionsetvalue
    //AccountObj.description = "This is the description of the sample account";

    ////set the lookup value
    //AccountObj["dat_institutename@odata.bind"] = "/institutenames(56ddb96b-5123-ed11-b83e-000d3a34fc34)";



    // create account record
    Xrm.WebApi.createRecord("account", data).then(
        function success(result) {
            console.log("Account created with ID: " + result.id);
            AccountId = result.id;
            // perform operations on record creation
           // XrmWebApiUpdate(executionContext,AccountId);
        },
        function (error) {
            console.log(error.message);
            // handle error conditions
        }
    );


}
function RetrieveAllAccountRecords(executionContext) {
 debugger;
    var accountFetchXML = "<fetch mapping='logical' version='1.0' output-format='xml-platform' distinct='false'>" +
                            "  <entity name='account'>" +
                            "    <attribute name='name' />" +
                            "    <attribute name='primarycontactid' />" +
                            "    <attribute name='telephone1' />" +
                            "    <attribute name='accountid' />" +
                            "    <order descending='false' attribute='name' />" +
                            "   </entity>" +
                            "  </fetch>";
 
    accountFetchXML = "?fetchXml=" + encodeURIComponent(accountFetchXML);
 
    var outputText = "Account Name\t\t\tPhone\n---------------------------------------------------\n";

    Xrm.WebApi.retrieveMultipleRecords("account", accountFetchXML).then(
    function success(result) {
        
        for ( var accountRecordsCount = 0;accountRecordsCount < result.entities.length; accountRecordsCount++) {

            outputText += result.entities[accountRecordsCount].name + "\t\t" + result.entities[accountRecordsCount].telephone1 + "\n";
        }
        Xrm.Utility.alertDialog(outputText, null);
    },
    function (error) {
        // Handle error conditions
        Xrm.Utility.alertDialog(error.message, null);
    });
}


function IFrameLoaded()
{
 alert("The iframe has finished loading");
}
<html>
	<head>
        <title>Example</title>
    </head>
    <body>
        <p>This is an example of a simple HTML page with one paragraph.</p>
    
</body>
</html>

