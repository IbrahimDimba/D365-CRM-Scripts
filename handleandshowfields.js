function handleInitialVisibility(executionContext) {
    var formContext = executionContext.getFormContext();

    var caseType = formContext.getAttribute("casetypecode")?.getValue();
    var businessLineAttr = formContext.getAttribute("jub_businessline");
    var caseOrigin = formContext.getAttribute("caseorigincode")?.getValue();

    var businessLineId = null;

    if (businessLineAttr && businessLineAttr.getValue() !== null) {
        businessLineId = businessLineAttr.getValue()[0].id
            .replace("{", "")
            .replace("}", "")
            .toLowerCase();
    }

    var fields = [
        "jub_correctiveaction",
        "jub_investmentaccountnumber",
        "jub_policyno",
        "jub_onbehalf",
        "jub_rootcause",
        "jub_preauthtype",
        "jub_casematuritydate",
        "jub_issueno",
        "jub_iraotificationdate",
        "jub_irastatus",
        "jub_policyclass",
        "jub_details",
        " jub_iraaction",
        "jub_updateira",
        "jub_updateasatdate"

    ];

    function setVisibility(fieldName, isVisible) {
        var control = formContext.getControl(fieldName);
        if (control) {
            control.setVisible(isVisible);
        }
    }

    function hideAll() {
        fields.forEach(function (field) {
            setVisibility(field, false);
        });
    }

    if (caseType === null && businessLineId === null && caseOrigin === null) {
        hideAll();
        return;
    }
    //Health
    if (businessLineId === "dfea4cc4-99e7-ee11-904c-000d3a664f1c") {

        setVisibility("jub_onbehalf", true);
        formContext.getAttribute("jub_onbehalf").setRequiredLevel("required");
        setVisibility("jub_policyno", true);
        formContext.getAttribute("jub_policyno").setRequiredLevel("required");
        setVisibility("jub_investmentaccountnumber", false);
        setVisibility("jub_correctiveaction", false);
        setVisibility("jub_onbehalf", false);
        setVisibility("jub_rootcause", false);
        setVisibility("jub_preauthtype", false);
        setVisibility("jub_casematuritydate", false);
        setVisibility("jub_issueno", false);
        setVisibility("jub_iraotificationdate", false);
        setVisibility("jub_irastatus", false);
        setVisibility("jub_policyclass", false);
        setVisibility("jub_details", false);
        setVisibility(" jub_iraaction", false);
        setVisibility("jub_updateira", false);
        setVisibility("jub_updateasatdate", false);

    }
    
//JAML
    if (businessLineId === "dfea4cc4-99e7-ee11-904c-000d3a664f1c") {

        setVisibility("jub_rootcause", true);
        setVisibility("jub_correctiveaction", true);
        setVisibility("jub_investmentaccountnumber", true);
        setVisibility("jub_policyno", false);
        setVisibility("jub_onbehalf", false);
        setVisibility("jub_preauthtype", false);
        setVisibility("jub_casematuritydate", false);
        setVisibility("jub_issueno", false);
        setVisibility("jub_iraotificationdate", false);
        setVisibility("jub_irastatus", false);
        setVisibility("jub_policyclass", false);
        setVisibility("jub_details", false);
        setVisibility(" jub_iraaction", false);
        setVisibility("jub_updateira", false);
        setVisibility("jub_updateasatdate", false);

    }
//LIFE
    else if (businessLineId === "1835be45-7ad8-ee11-904c-000d3ab49c70") {

        setVisibility("jub_correctiveaction", false);
        setVisibility("jub_investmentaccountnumber", false);
        setVisibility("jub_onbehalf", false);
        setVisibility("jub_rootcause", false);
        setVisibility("jub_preauthtype", false);
        setVisibility("jub_casematuritydate", true);
        setVisibility("jub_issueno", true);
        setVisibility("jub_iraotificationdate", true);
        setVisibility("jub_irastatus", true);
        setVisibility("jub_policyclass", true);
        setVisibility("jub_details", true);
        setVisibility(" jub_iraaction", true);
        setVisibility("jub_updateira", true);
        setVisibility("jub_updateasatdate", true);
        setVisibility("jub_policyno", true);
         

    }
     //PENSION
     else if (businessLineId === "b8961c52-7ad8-ee11-904c-000d3ab49c70") {

        setVisibility("jub_correctiveaction", false);
        setVisibility("jub_investmentaccountnumber", false);
        setVisibility("jub_policyno", true);
        setVisibility("jub_onbehalf", false);
        setVisibility("jub_rootcause", false);
        setVisibility("jub_preauthtype", false);
        setVisibility("jub_casematuritydate", true);
        setVisibility("jub_issueno", true);
        setVisibility("jub_iraotificationdate", true);
        setVisibility("jub_irastatus", true);
        setVisibility("jub_policyclass", true);
        setVisibility("jub_details", true);
        setVisibility(" jub_iraaction", true);
         setVisibility("jub_updateira", true);
         setVisibility("jub_updateasatdate", true);
         

    }
    else {
 
        hideAll();
    }
}
