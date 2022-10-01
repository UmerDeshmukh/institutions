function BPF(executionContext) {
    var formContext = executionContext.getFormContext();
debugger;
    var Stage1 = "66f1c1da-9248-4a24-90e3-bf423fe128be";
    var Stage2 = "64187e02-559a-46ab-abbd-fcbde6d53890";
    //var Stage3 = "";

    var entity = {};
    entity["activestageid@odata.bind"] = "/processstages(" + Stage2 + ")"; 
    entity["traversedpath"] = Stage1 + "," + Stage2;

  var BPFId = "fbd06d91-5b41-ed11-bba1-000d3a57722e";

var req = new XMLHttpRequest();
req.open("PATCH", Xrm.Utility.getGlobalContext().getClientUrl() + "/api/data/v9.0/dat_bpfs(" + BPFId + ")", true);
req.setRequestHeader("OData-MaxVersion", "4.0");
req.setRequestHeader("OData-Version", "4.0");
req.setRequestHeader("Accept", "application/json");
req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
req.onreadystatechange = function() {
    if (this.readyState === 4) {
        req.onreadystatechange = null;
        if (this.status === 204) {
            alert("Success");
            //BPFMove(executionContext)

        } else {
            alert("Error");
            Xrm.Utility.alertDialog(this.statusText);
        }
    }
};
req.send(JSON.stringify(entity));
}