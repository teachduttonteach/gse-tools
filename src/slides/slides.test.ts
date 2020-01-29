import { Test } from '../test/Test';
import { SlideGS } from './SlideGS';
import { SlideshowGS } from './SlideshowGS';

function test() {

    let thisSlideshow = new SlideshowGS("1_opOab_7nZQJnpWnUReg_euNxMmTnuvAMxY7MkswfDs");
    thisSlideshow.clear
    thisSlideshow.getObject
    thisSlideshow.getSlideById
    thisSlideshow.getSlideByType
    thisSlideshow.getTemplateSlideUsed
    thisSlideshow.getUiObject
    thisSlideshow.removeSlide
    thisSlideshow.setSlideBodyByType
    thisSlideshow.setSlideTitleByType
    thisSlideshow.setTemplate

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

}