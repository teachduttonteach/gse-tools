import { Test } from '../test/Test';
import { SlideGS } from './SlideGS';
import { SlideshowGS } from './SlideshowGS';

function test() {

    let thisSlideshow = new SlideshowGS("1_opOab_7nZQJnpWnUReg_euNxMmTnuvAMxY7MkswfDs");
    //thisSlideshow.clear();
    Logger.log(thisSlideshow.getObject().getName());
    Logger.log(thisSlideshow.getSlideByNotes("Session objectives").getTitle());
    Logger.log(thisSlideshow.getTemplateSlideUsed().toString());
    thisSlideshow.removeSlide("Session objectives");
    thisSlideshow.setSlideBodyByType("survey", "THIS IS A NEW BODY");
    thisSlideshow.setSlideTitleByType("survey", "THIS IS A NEW TiTLE");
    thisSlideshow.setTemplate("1ozaIETzURGRC8sD0aMQuq5ityc-RKitQxvTC4Gacxj0");

    /*
    let thisSlide = thisSlideshow.getSlide(1);
    thisSlide.addItem
    thisSlide.addItems
    thisSlide.changePicture
    thisSlide.getNotes
    thisSlide.getObject
    thisSlide.getPageElements
    thisSlide.positionPicture
    thisSlide.remove
    thisSlide.replaceImage
    thisSlide.setBody
    thisSlide.setDimensions
    thisSlide.setList
    thisSlide.setNotes
    thisSlide.setTitle
*/
}