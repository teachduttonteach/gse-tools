import {Test} from '../test/Test';
import {SlideGS} from './SlideGS';
import {SlideshowGS} from './SlideshowGS';
import {QuestionType} from '../enums/QuestionType';
import {DriveGS} from '../drive/DriveGS';
import {Dimensions} from './Dimensions';

function test() {
  const thisSlideshow = new SlideshowGS('1_opOab_7nZQJnpWnUReg_euNxMmTnuvAMxY7MkswfDs');
  // thisSlideshow.clear();
  Logger.log(thisSlideshow.getObject().getName());
  Logger.log(thisSlideshow.getSlideByNotes('Session objectives').getTitle());
  Logger.log(thisSlideshow.getTemplateSlideUsed().toString());
  thisSlideshow.removeSlide('Session objectives');
  thisSlideshow.addSlide(new Date().toString(), 'Inserted slide', 'Session objectives');
  thisSlideshow.setSlideBodyByType('survey', 'THIS IS A NEW BODY');
  thisSlideshow.setSlideTitleByType('survey', 'THIS IS A NEW TiTLE');
  thisSlideshow.setTemplate('1ozaIETzURGRC8sD0aMQuq5ityc-RKitQxvTC4Gacxj0');


  const thisSlide = thisSlideshow.getSlide(3);
  thisSlideshow.changeSlidePicture('1TrdcLHHWumKdfuy8BWcRK1zn-AEH6gIX', thisSlide);
  thisSlide.addItem('Multiple Choice', 'one\ntwo\nthree');
  thisSlide.addItems(['four', 'five']);

  const blob = new DriveGS().getImageBlob('1QsF3e390z9N7LPte8IOUqiiVYO3lHWXq');
  if (blob == false) throw new Error('Could not find picture');

  Logger.log('Slide notes: ' + thisSlide.getNotes());
  thisSlide.getObject();
  Logger.log(thisSlide.getPageElements());
  thisSlide.setBody(new Date() + ' THIS IS THE NEW BODY RAHHHHH');
  const dimensions = {} as Dimensions;
  dimensions.maxHeight = 600;
  thisSlide.setDimensions(dimensions);
  thisSlide.positionPicture(1);
  thisSlide.changePicture(blob);
  thisSlide.setList('one\ttwo\tthree\tfour');
  thisSlide.setNotes('SESSION OBJECTIVES');
  thisSlide.setTitle('One stupid title');
  // thisSlide.remove();
  // thisSlideshow.addSlide(new Date().toString(), "Inserted slide", "Session objectives");
}
