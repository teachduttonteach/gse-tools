import { FormEventGS } from './FormEventGS';
import { FormsGS } from './FormsGS';
import { DriveGS } from '../drive/DriveGS';
import { QuestionType } from '../enums/QuestionType';
function onSubmit(e) {
    const testFormEvent = new FormEventGS(e);
    console.log('Full date: ' + testFormEvent.getFullDate());
    const testFormEventOptions = {};
    testFormEventOptions.dateDelim = ' ... ';
    console.log('Full date 1: ' + testFormEvent.getFullDate(testFormEventOptions));
    testFormEventOptions.dateOrder = 'DM';
    console.log('Full date 2: ' + testFormEvent.getFullDate(testFormEventOptions));
    console.log('Email: ' + testFormEvent.getEmail());
    console.log('Object: ' + testFormEvent.getObject());
    console.log('Title: ' + testFormEvent.getTitle());
}
function test() {
    // @ts-ignore
    const testSuite = new gsetoolstest.Test();
    const testForms = new FormsGS('1REupX2baJq753tG9jKWCsjAMEfvzncvfSTBSV3WX4IU');
    testForms.replaceTrigger(GoogleAppsScript.Script.EventType.ON_FORM_SUBMIT);
    testForms.deleteItems();
    // Incorrect image
    // testForms.addImageFromId("1avOU-o7D06eXqb2W-iv6OdUHgcaESebbsadf")
    // Correct image
    testForms.addImageFromId('1avOU-o7D06eXqb2W-iv6OdUHgcaESebb');
    const testImage = new DriveGS().getImageBlob('1avOU-o7D06eXqb2W-iv6OdUHgcaESebb');
    if (typeof testImage !== 'boolean') {
        // Incorrect image
        // testForms.addImage({} as GoogleAppsScript.Base.BlobSource);
        // Correct image
        testForms.addImage(testImage);
    }
    // Correct items
    testForms.addItem('Test item', QuestionType.Paragraph);
    testForms.addParagraph('Test Paragraph item');
    testForms.addTrueFalse('Test TrueFalse');
    // From strings
    testForms.addMultipleCheck('Test MCheck item', 'Choice1\nChoice2\nChoice3');
    testForms.addMultipleChoice('Test MChoice item', 'Choice1\nChoice2\nChoice3');
    testForms.addMultipleGridCheck('Test MCheck Grid item', 'Col1\nCol2\nCol3', 'Row1\nRow2\nRow3');
    testForms.addMultipleGridChoice('Test MCheck Grid item', 'Col1\nCol2\nCol3', 'Row1\nRow2\nRow3');
    // From arrays
    testForms.addMultipleCheck('Test MCheck item', ['Choice1', 'Choice2', 'Choice3']);
    testForms.addMultipleChoice('Test MChoice item', ['Choice1', 'Choice2', 'Choice3']);
    testForms.addMultipleGridCheck('Test MCheck Grid item', ['Column1', 'Column2', 'Column3'], ['Row1', 'Row2', 'Row3']);
    testForms.addMultipleGridChoice('Test MCheck Grid item', ['Column1', 'Column2', 'Column3'], ['Row1', 'Row2', 'Row3']);
    // testForms.convertLinebreaksToList
    Logger.log(testForms.getObject().getTitle());
    testForms.setTitle('Just a Test');
    // testForms.setValuesFromList()
    /*
      testForms.activateUi
      testForms.addMenu
      testForms.getUiObject
      testForms.showSidebar
  
      */
}
