export function updateTriggers(formId: string, functionName: string) {
    // Update triggers for bellwork
    for (let t of ScriptApp.getProjectTriggers()) {
      if (t.getHandlerFunction() == functionName) ScriptApp.deleteTrigger(t);
    }
    ScriptApp.newTrigger(functionName).forForm(formId).onFormSubmit().create();
  }
  