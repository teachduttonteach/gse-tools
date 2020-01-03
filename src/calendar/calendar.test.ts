import {CalendarGS} from "./CalendarGS"
import {DateParams} from "./DateParams"
import {MapGS} from "../map/MapGS"
import {Test} from "../test/Test"

function test() {
  const holidayCalendar = new CalendarGS("en.usa#holiday@group.v.calendar.google.com");
  let eventOptions: DateParams = {} as DateParams;

  const argumentValues: MapGS<string, Array<string>> = new MapGS();
  argumentValues.set("dateOrder", ["MD", "DM"]);
  argumentValues.set("dateDelim", ["-", "/", "."]);
  argumentValues.set("noEventString", ["Nothing", "None"]);
  argumentValues.set("titlePrefix", [" ", " ... "]);

  let testSuite = new Test();
  testSuite.testEachArgumentOfMethod(eventOptions, argumentValues, holidayCalendar.getUpcomingDueDates.bind(holidayCalendar), [25, "objectToTest"]);
  testSuite.finish();
}