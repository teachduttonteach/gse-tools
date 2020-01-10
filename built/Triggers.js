/**
 * Update triggers for a particular form
 *
 * @param {string} formId the form
 * @param {string} functionName the function to call when triggered on form
 *  submit
 */
export function updateTriggers(formId, functionName) {
    for (const t of ScriptApp.getProjectTriggers()) {
        if (t.getHandlerFunction() == functionName)
            ScriptApp.deleteTrigger(t);
    }
    ScriptApp.newTrigger(functionName).forForm(formId).onFormSubmit().create();
}
