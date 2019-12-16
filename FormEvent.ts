var FormEvent = function(e: GoogleAppsScript.Events.FormsOnFormSubmit) {
    this.title = e.source.getTitle();
    this.date = e.response.getTimestamp();
    this.email = e.response.getRespondentEmail();
    this.response = e.response.getItemResponses()[0].getResponse();
    this.fullDate = (this.date.getMonth() + 1) + "/" + this.date.getDate() + "\n" + e.response.getItemResponses()[0].getItem().getTitle();
}