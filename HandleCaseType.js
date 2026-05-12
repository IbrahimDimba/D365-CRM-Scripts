function handleCaseTypeLogic(executionContext) {

    var formContext = executionContext.getFormContext();

    var caseTypeAttr = formContext.getAttribute("casetypecode");
    var preAuthAttr = formContext.getAttribute("new_preauthtype");
    var preAuthCtrl = formContext.getControl("new_preauthtype");
    var businessLineAttr = formContext.getAttribute("new_businessline");

    if (!caseTypeAttr || !preAuthAttr || !preAuthCtrl || !businessLineAttr)
        return;

    var caseTypeValue = caseTypeAttr.getValue();

    if (caseTypeValue === 0) {

        preAuthCtrl.setVisible(true);
        preAuthAttr.setRequiredLevel("required");

        var lookupValue = [{
            id: "{50d0743f-7ad8-ee11-904c-000d3ab49c70}", 
            entityType: "jub_businessline" 
        }];

        businessLineAttr.setValue(lookupValue);

    } else {

        preAuthCtrl.setVisible(false);
        preAuthAttr.setRequiredLevel("none");  


    }
}
