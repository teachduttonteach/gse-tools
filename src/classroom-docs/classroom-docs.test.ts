import {ClassroomDocsGS} from 'ClassroomDocsGS';
import {Test} from '../test/Test';
import {DriveGS} from '../drive/DriveGS';
import {MapGS} from '../map/MapGS';
import {ClassroomGS} from '../classroom/ClassroomGS';
import {WriteDocsParams} from './WriteDocsParams';

function test() {
  // @ts-ignore
  const testSuite = new gsetoolstest.Test('doc', true);

  const classroom = new ClassroomGS();
  const classData = classroom.getClass('izg4qrh');
  const topicName = classData.getTopics()[0];
  const options = {} as WriteDocsParams;
  options.displayAnnouncements = 3;
  options.docTitle = 'Friends Romans Countryment';

  const thisClassDoc = new ClassroomDocsGS(new DriveGS().getOrCreateFileByName('Test Topic for Test Class').getId());
  testSuite.testFunction(thisClassDoc.writeClassroomDocuments.bind(thisClassDoc), [classData, topicName, options]);
  testSuite.finish();
}
