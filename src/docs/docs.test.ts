import {DocsGS} from './DocsGS';
import {Test} from '../test/Test';

function test() {
  const testDoc = new DocsGS('1coYlKYwsvN3MuHIo1hU6zoSQaZCYCc8Sp-Fd6RI1neo');

  // @ts-ignore
  const testSuite = new gsetoolstest.Test('doc');

  // getObject
  testSuite.testObject(testDoc);

  // changeSeparator
  testSuite.testMethod(testDoc.changeSeparator.bind(testDoc), [' xxx '], 'changeSeparator');
  const testSep: GoogleAppsScript.Document.GlyphType = DocumentApp.GlyphType.NUMBER;
  testSuite.testMethod(testDoc.changeSeparator.bind(testDoc), [testSep], 'changeSeparator');

  // addText
  testSuite.testMethod(testDoc.addText.bind(testDoc), ['This is normal text'], 'addText');
  testSuite.testMethod(testDoc.addText.bind(testDoc), ['This is header 1 text', 1], 'addText');
  testSuite.testMethod(testDoc.addText.bind(testDoc), ['This is header 2 text', 2], 'addText');

  // appendItem
  testSuite.testMethod(testDoc.appendItem.bind(testDoc), ['Text to append', 'Title of append', 'https://google.com'], 'appendItem');

  // changeTitleDelim
  testSuite.testMethod(testDoc.changeTitleDelim.bind(testDoc), [' xxx '], 'changeTitleDelim');

  // clearBody

  // getUiObject
  // activateUi
  // showSidebar
  // addMenu

  testSuite.finish();
}
