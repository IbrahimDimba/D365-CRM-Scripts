function PopulateDetails(executionContext) {
    debugger;
    var formContext = executionContext.getFormContext();

    if (formContext.getAttribute("ncba_customer").getValue() != null) {
        try {
            var customerId = formContext.getAttribute("ncba_customer").getValue()[0].id.replace("{", "").replace("}", "").toLowerCase();
            Xrm.WebApi.retrieveRecord("contact", customerId, "?$select=_ncba_customersegment_value,_ncba_sector_value,mobilephone,_ncba_relationshipmanager_value").then(
                function success(result) {
                    
                    // Columns
                    var accountid = result["contactid"]; // Guid

                    var ncba_customersegment = result["_ncba_customersegment_value"]; // Lookup
                    var ncba_customersegment_formatted = result["_ncba_customersegment_value@OData.Community.Display.V1.FormattedValue"];
                    var ncba_customersegment_lookuplogicalname = result["_ncba_customersegment_value@Microsoft.Dynamics.CRM.lookuplogicalname"];

                    var ncba_sector = result["_ncba_sector_value"]; // Lookup
                    var ncba_sector_formatted = result["_ncba_sector_value@OData.Community.Display.V1.FormattedValue"];
                    var ncba_sector_lookuplogicalname = result["_ncba_sector_value@Microsoft.Dynamics.CRM.lookuplogicalname"];

                    var ncba_relationshipmanager = result["_ncba_relationshipmanager_value"]; // Lookup
                    var ncba_relationshipmanager_formatted = result["_ncba_relationshipmanager_value@OData.Community.Display.V1.FormattedValue"];
                    var ncba_relationshipmanager_lookuplogicalname = result["_ncba_relationshipmanager_value@Microsoft.Dynamics.CRM.lookuplogicalname"];

                    var mobilephone = result["mobilephone"];
                    
                    var segment = new Array();
                    var sector = new Array();
               
                    var relationshipManager = new Array();

                          // contact number
                          if (mobilephone != null) {
                            formContext.getAttribute("ncba_contactno").setValue(mobilephone);
                            }
                            else {
                            formContext.getAttribute("ncba_contactno").setValue(null);
                            }

                    // segement
                    if (ncba_customersegment_lookuplogicalname != null) {
                        segment[0] = new Object();
                        segment[0].id = ncba_customersegment;
                        segment[0].name = ncba_customersegment_formatted;
                        segment[0].entityType = ncba_customersegment_lookuplogicalname;

                        formContext.getAttribute("ncba_segment").setValue(segment);
                    }
                    else {
                        formContext.getAttribute("ncba_segment").setValue(null);
                    }

                    // sector
                    if (ncba_sector_lookuplogicalname != null) {
                        sector[0] = new Object();
                        sector[0].id = ncba_sector;
                        sector[0].name = ncba_sector_formatted;
                        sector[0].entityType = ncba_sector_lookuplogicalname;

                        formContext.getAttribute("ncba_sector").setValue(sector);
                    }
                    else {
                        formContext.getAttribute("ncba_sector").setValue(null);
                    }

                    // relationship manager
                    if (ncba_relationshipmanager_lookuplogicalname != null) {
                        relationshipManager[0] = new Object();
                        relationshipManager[0].id = ncba_relationshipmanager;
                        relationshipManager[0].name = ncba_relationshipmanager_formatted;
                        relationshipManager[0].entityType = ncba_relationshipmanager_lookuplogicalname;

                        formContext.getAttribute("ncba_relationshipmanager").setValue(relationshipManager);
                    }
                    else {
                        formContext.getAttribute("ncba_relationshipmanager").setValue(null);
                    }

             

                },
                function (error) {
                    debugger;
                    console.log(error.message);
                }
            );
        }
        catch (error) {

        }
    }
}

// load call report related records
function RelatedRecords(executionContext) {
    debugger;
    var formContext = executionContext.getFormContext();
    var fetchXml = "";
    if (formContext.getAttribute("ncba_customer") != null) {
        try {
            var customerId = formContext.getAttribute("ncba_customer").getValue()[0].id;
            if (customerId != null) {
                // display cases related to the selected customer
                try {
                    fetchXml = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">'
                        + '<entity name = "incident">'
                        + '<attribute name="ticketnumber" />'
                        + '<attribute name="prioritycode" />'
                        + '<attribute name="title" />'
                        + '<attribute name="createdon" />'
                        + '<attribute name="customerid" />'
                        + '<attribute name="ownerid" />'
                        + '<attribute name="statecode" />'
                        + '<attribute name="incidentid" />'
                        + '<attribute name="caseorigincode" />'
                        + '<order attribute="title" descending="false" />'
                        + '<filter type="and">'
                        + '<condition attribute="customerid" operator="eq" uitype="account" value="' + customerId + '"/>'
                        + '</filter>'
                        + '</entity>'
                        + '</fetch>';

                    var subgrid = Xrm.Page.getControl("cases");
                    var ucisubGrid = formContext.getControl("cases");

                    if (subgrid === null) {
                        setTimeout(RelatedRecords, 3000);
                        return;
                    }
                    else {
                        subgrid.setFilterXml(fetchXml);
                        ucisubGrid.refresh();
                    }
                }
                catch (error) {
                    console.log("Error " + error);
                }

                // display call reports related to the selected customer
                fetchXml = "";
                try {
                    fetchXml = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">'
                        + '<entity name = "ncba_callreport" >'
                        + '<attribute name="ncba_name" />'
                        + '<attribute name="createdon" />'
                        + '<attribute name="ncba_typeofactivity" />'
                        + '<attribute name="ncba_reason" />'
                        + '<attribute name="ncba_purpose" />'
                        + '<attribute name="ncba_informationrequired" />'
                        + '<attribute name="ncba_areaofconcern" />'
                        + '<attribute name="ncba_callreportid" />'
                        + '<order attribute="createdon" descending="true" />'
                        + '<filter type="and">'
                        + '<condition attribute="ncba_customer" operator="eq" uitype="account" value="' + customerId + '"/>'
                        + '</filter>'
                        + '</entity>'
                        + '</fetch>';

                    var subgrid = Xrm.Page.getControl("callreports");
                    var ucisubGrid = formContext.getControl("callreports");

                    if (subgrid === null) {
                        setTimeout(RelatedRecords, 3000);
                        return;
                    }
                    else {
                        subgrid.setFilterXml(fetchXml);
                        ucisubGrid.refresh();
                    }
                }
                catch (error) {
                    console.log("Error " + error);
                }

                // display opportunties related to the selected customer
                fetchXml = "";
                try {
                    fetchXml = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">'
                        + '<entity name = "opportunity" >'
                        + '<attribute name="name" />'
                        + '<attribute name="statecode" />'
                        + '<attribute name="opportunityratingcode" />'
                        + '<attribute name="estimatedclosedate" />'
                        + '<attribute name="createdon" />'
                        + '<attribute name="opportunityid" />'
                        + '<order attribute="createdon" descending="true" />'
                        + '<filter type="and">'
                        + '<condition attribute="customerid" operator="eq" uitype="account" value="' + customerId + '"/>'
                        + '</filter>'
                        + '</entity>'
                        + '</fetch>';

                    var subgrid = Xrm.Page.getControl("opportunities");
                    var ucisubGrid = formContext.getControl("opportunities");

                    if (subgrid === null) {
                        setTimeout(RelatedRecords, 3000);
                        return;
                    }
                    else {
                        subgrid.setFilterXml(fetchXml);
                        ucisubGrid.refresh();
                    }
                }
                catch (error) {
                    console.log("Error " + error);
                }

            
                // display leads/referrals related to the selected customer
                fetchXml = "";
                try {
                    fetchXml = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">'
                        + '<entity name = "lead" >'
                        + '<attribute name="fullname" />'
                        + '<attribute name="entityimage_url" />'
                        + '<attribute name="createdon" />'
                        + '<attribute name="subject" />'
                        + '<order attribute="createdon" descending="true" />'
                        + '<attribute name="ownerid" />'
                        + '<attribute name="statecode" />'
                        + '<attribute name="leadqualitycode" />'
                        + '<attribute name="msdyn_predictivescoreid" />'
                        + '<attribute name="leadid" />'
                        + '<filter type="and">'
                        + '<condition attribute="customerid" operator="eq" value="' + customerId + '"/>'
                        + '</filter>'
                        + '</entity>';

                    var subgrid = Xrm.Page.getControl("Referrals");
                    var ucisubGrid = formContext.getControl("Referrals");

                    if (subgrid === null) {
                        setTimeout(RelatedRecords, 3000);
                        return;
                    }
                    else {
                        subgrid.setFilterXml(fetchXml);
                        ucisubGrid.refresh();
                    }
                }
                catch (error) {
                    console.log("Error " + error);
                }
            }
        }
        catch (error) {

        }
    }
}