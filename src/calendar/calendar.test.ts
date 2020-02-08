import {CalendarGS} from './CalendarGS';
import {MapGS} from '../map/MapGS';

/** Test functions in app */
function test() {
  const calendarId = 'en.usa#holiday@group.v.calendar.google.com';
  const holidayCalendar = new CalendarGS(calendarId);

  const argumentValues: MapGS<string, Array<string>> = new MapGS();
  argumentValues.set('dateOrder', ['MD', 'DM']);
  argumentValues.set('dateDelim', ['-', '/', '.']);
  argumentValues.set('noEventString', ['Nothing', 'None']);
  argumentValues.set('titlePrefix', [' ', ' ... ']);

  // @ts-ignore
  const testSuite = new gsetoolstest.Test();

  // getUpcomingDueDates
  testSuite.testEachArgumentOfMethod(
      argumentValues,
      holidayCalendar.getUpcomingDueDates.bind(holidayCalendar),
      [25, 'objectToTest'],
      'getUpcomingDueDates',
  );

  // getId
  testSuite.testMethod(holidayCalendar.getId.bind(holidayCalendar), [], 
    'getId');

  // getObject
  testSuite.testEquals('getObject', holidayCalendar.getObject().getId(),
      calendarId);

  // getUpcomingEvents
  testSuite.testMethodThenCall(holidayCalendar.getUpcomingEvents
    .bind(holidayCalendar),
      [[10], [20], [30]], 'getDate', 'getUpcomingEvents', true);

  // getUpcomingDueDatesList
  testSuite.testEachArgumentOfMethod(
      argumentValues,
      holidayCalendar.getUpcomingDueDatesList.bind(holidayCalendar),
      [25, 'objectToTest'],
      'getUpcomingDueDatesList',
  );

  const upcomingEvent = holidayCalendar.getUpcomingEvents(30)[0];

  // getDate
  testSuite.testMethod(upcomingEvent.getDate.bind(upcomingEvent), [], 
    'getDate');

  // getObject
  testSuite.testObject(upcomingEvent, 'upcomingEvent');

  testSuite.finish();
}
