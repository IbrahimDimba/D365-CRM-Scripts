function caseType(executionContext) {

    var formContext = executionContext.getFormContext();

    var caseTypeAttr = formContext.getAttribute("casetypecode");
    var preAuthAttr = formContext.getAttribute("new_preauthtype");
    var preAuthCtrl = formContext.getControl("new_preauthtype");

    if (!caseTypeAttr || !preAuthAttr || !preAuthCtrl) return;

    var value = caseTypeAttr.getValue();

    if (value === 0) {
        preAuthCtrl.setVisible(true);
        preAuthAttr.setRequiredLevel("required");
    }
    else {
        preAuthCtrl.setVisible(false);
        preAuthAttr.setRequiredLevel("none");
      }
}
