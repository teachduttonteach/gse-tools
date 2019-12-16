class SheetEvent {
    sheet: SpreadsheetGS = null;
    sheetName: string = null;
    row: number = null;
    column: number = null;
    value: string = null;

    constructor(private event: GoogleAppsScript.Events.SheetsOnEdit) {
        this.sheet = new SpreadsheetGS(event.source.getActiveSheet().getSheetId());
        this.sheetName = event.source.getActiveSheet().getName();
        this.row = event.range.getRow();
        this.column = event.range.getColumn();
        this.value = event.range.getValue();  
    }
}