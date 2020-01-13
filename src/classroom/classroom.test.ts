import {Test} from '../test/Test';
import {ClassGS} from 'ClassGS';
import {ClassroomGS} from './ClassroomGS';
import {MapGS} from '../map/MapGS';
import {Work} from './Work';
import {CourseMaterial} from './CourseMaterial';
import {TopicResource} from './TopicResource';

/** Test functions in app */
function test() {
  const classId = '';

  const classDataParams: MapGS<string, Array<string>> = new MapGS();
  classDataParams.set('dueDateString', ['DueDate', 'DUE DATE', 'due']);
  classDataParams.set('dueDateDelim', [':', '-', '...']);
  classDataParams.set('dueDateOrder', ['DMY', 'DYM', 'MDY', 'MYD', 'DMY', 'DYM']);

  const materialParamsFile: CourseMaterial = {} as CourseMaterial;
  materialParamsFile.title = 'Test Material with File';
  materialParamsFile.file = 'https://docs.google.com/document/d/1wGf1BPoSzqnMMcBVyAeLGvQZtw25DP_Q3uBtotWrdz4';

  const materialParamsVideo: CourseMaterial = {} as CourseMaterial;
  materialParamsVideo.title = 'Test Material with Video';
  materialParamsVideo.video = 'https://www.youtube.com/watch?v=NLRODdJqigQ';

  const materialParamsLink: CourseMaterial = {} as CourseMaterial;
  materialParamsLink.title = 'Test Material with Link';
  materialParamsLink.link = 'https://github.com/teachduttonteach/gse-tools/edit/master/README.md';

  const materialParamsForm: CourseMaterial = {} as CourseMaterial;
  materialParamsForm.title = 'Test Material with Form';
  materialParamsForm.form = 'https://docs.google.com/forms/d/1sOweZJDYt4uyMEOqwnp6DDuf3A8yrs7Cfzs8iToMLkw/edit';

  const workParams: MapGS<string, Array<any>> = new MapGS();
  workParams.set('description', ['some work', 'other work', 'third work']);
  workParams.set('dueDate', [Date()]);
  workParams.set('materials', [[materialParamsFile, materialParamsForm, materialParamsLink, materialParamsVideo]]);
  workParams.set('title', ['Title 1', 'Title 2']);

  // @ts-ignore
  const testSuite = new gsetoolstest.Test('doc', true);

  // ClassGS
  const testClassroom = new ClassroomGS();
  const testClass = testClassroom.getClass('izg4qrh'); // gse-tools Test
  const testTopic = testClass.getTopics()[0];
  const testCourseWork = testClass.getTopicInfo(testTopic);

  const newTopicName = 'For Testing (Second)';
  const annMaterial: CourseMaterial = {} as CourseMaterial;
  annMaterial.title = 'Sample Material';
  annMaterial.link = 'https://teachduttonteach.com';
  const annMaterials = [annMaterial];

  // getName
  testSuite.testEquals('Class name', testClass.getName(), 'gse-tools Test');

  // getCalendarId
  testSuite.testEquals('Calendar Id', testClass.getCalendarId(), 'campusinternationalschool.org_classroom63913b01@group.calendar.google.com');

  // getTopics
  testSuite.testMethod(testClass.getTopics.bind(testClass), [], 'getTopics');

  // getTopicName
  testSuite.testEquals('ClassInfo first topic name', testClass.getTopicName(testTopic), 'Environmental Systems and Societies');

  // addTopic
  testSuite.testMethod(testClass.addTopic.bind(testClass), [newTopicName], 'addTopic');

  // addAnnouncement
  testSuite.testMethod(testClass.addAnnouncement.bind(testClass), ['This is just a test', annMaterials], 'addAnnouncement');

  // getAnnouncements
  testSuite.testMethod(testClass.getAnnouncements.bind(testClass), [], 'getAnnouncements');

  // addCourseWork
  testSuite.testEachArgumentOfMethod(workParams, testClass.addCourseWork.bind(testClass), [testTopic, 'objectToTest'], 'testEachArgumentOfMethod');

  // getTopicInfo
  testSuite.testMethod(testClass.getTopicInfo.bind(testClass), [testTopic], 'getCourseWork');

  // ClassroomGS
  // getObject
  testSuite.testObject(testClassroom);

  // getClass
  testSuite.testMethod(testClassroom.getClass.bind(testClassroom), ['i62tn2'], 'getClass');

  testSuite.finish();
}
