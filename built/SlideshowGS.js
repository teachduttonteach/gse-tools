"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var UiGS_1 = require("./UiGS");
var DriveGS_1 = require("./DriveGS");
/**
 * Class to access methods and properties of Google Presentations
 */
var SlideshowGS = /** @class */ (function (_super) {
    __extends(SlideshowGS, _super);
    function SlideshowGS(id) {
        var _this = _super.call(this) || this;
        _this._ui = SlidesApp.getUi();
        _this._presentation = SlidesApp.openById(id);
        if (_this._presentation == null)
            throw new Error("Slideshow not found with id " + id + " in SlideshowGS()");
        for (var _i = 0, _a = _this._presentation.getSlides(); _i < _a.length; _i++) {
            var s = _a[_i];
            _this._allSlides.push(new SlideGS(s));
        }
        return _this;
    }
    /**
     * Gets the underlying Google Apps Script object for direct access
     *
     * @returns {GoogleAppsScript.Slides.Presentation} the Presentation object
     */
    SlideshowGS.prototype.getObject = function () {
        return this._presentation;
    };
    /**
     * Sets the presentation template for adding slides
     *
     * @param id the id of the presentation template
     *
     * @returns {SlideshowGS} the object for chaining
     */
    SlideshowGS.prototype.setTemplate = function (id) {
        if (id != null) {
            this._template = SlidesApp.openById(id);
            if (this._template != null) {
                throw new Error("Could not find requested Google Slides template in Slides.setTemplate");
            }
            return this;
        }
        else {
            throw new Error("Template id is not defined for Slides.setTemplate");
        }
    };
    ;
    /**
     * Changes the picture on the selected slide
     *
     * @param folder the folder containing the pictures
     * @param slideNum the number of the slide to change the picture of
     *
     * @returns {SlideshowGS} the object for chaining
     */
    SlideshowGS.prototype.changeSlidePicture = function (folder, slideNum) {
        if (slideNum === void 0) { slideNum = 1; }
        if (folder != "") {
            var chosenPicture = new DriveGS_1.DriveGS().getRandomPicture(folder);
            var slide = this.getSlide(slideNum);
            slide.positionPicture(slide.changePicture(chosenPicture));
        }
        return this;
    };
    ;
    /**
     * Gets the slide by number
     *
     * @param num the number of the slide
     *
     * @returns {SlideGS} the object for chaining
     */
    SlideshowGS.prototype.getSlide = function (num) {
        if (typeof num === "number") {
            return this._allSlides[num];
        }
        else {
            throw new Error("Could not get slide #" + num + " from slideshow in Slides.getSlide");
        }
    };
    ;
    /**
     * Adds a slide to the Slideshow, using a template if present
     *
     * @param title the title of the new slide
     * @param text the body of the new slide
     * @param type the type of the new slide
     *
     * @returns {SlideGS} the new slide object
     */
    SlideshowGS.prototype.addSlide = function (title, body, type) {
        var slideAdded;
        if (this._template != null) {
            if (this._template.getSlides().length > 0) {
                var slideToGet = this._allSlides.length % this._template.getSlides().length;
                slideAdded = this._presentation.appendSlide(this._template.getSlides()[slideToGet]);
            }
            else {
                slideAdded = this._presentation.appendSlide(this._template.getSlides()[0]);
            }
        }
        else {
            slideAdded = this._presentation.appendSlide();
        }
        return new SlideGS(slideAdded).setTitle(title).setBody(body).setNotes(type);
    };
    ;
    /**
     * Gets the slide in the presentation from the id of the slide
     *
     * @param id the id of the slide
     *
     * @returns {SlideGS} the object for chaining
     */
    SlideshowGS.prototype.getSlideById = function (id) {
        if (typeof id === "string") {
            for (var j = 0; j < this._allSlides.length; j++) {
                if (this._allSlides[j].getNotes().indexOf(id) == 0) {
                    return this._allSlides[j];
                }
            }
            throw new Error("Slide id " + id + " not found in SlideshowGS.getSlideById");
        }
        else {
            throw new Error("ID is not defined to remove in SlideshowGS.getSlideById");
        }
    };
    ;
    /**
     * Removes a slide from the presentation
     *
     * @param id the id of the slide to remove
     *
     * @returns {SlideshowGS} the object for chaining
     */
    SlideshowGS.prototype.removeSlide = function (id) {
        if (typeof id === "string") {
            this.getSlideById(id)._slide.remove();
            return this;
        }
        else {
            throw new Error("ID is not defined to remove in Slides.removeSlide");
        }
    };
    ;
    /**
     * Gets the slide type from the slide notes
     *
     * @param typeTitle the type of the slide (from slide notes)
     *
     * @returns {SlideGS} the requested slide
     */
    SlideshowGS.prototype.getSlideByType = function (typeTitle) {
        var slide = this.getSlideById(typeTitle);
        if (slide == null) {
            return this.addSlide(typeTitle, "", typeTitle);
        }
        else {
            return slide;
        }
    };
    ;
    /**
     * Sets the body for the given slide type
     *
     * @param typeTitle the type of the slide
     * @param slideText the body text to put in the slide
     *
     * @returns {SlideshowGS} the object for chaining
     */
    SlideshowGS.prototype.setSlideBodyByType = function (typeTitle, slideText) {
        this.getSlideByType(typeTitle).setBody(slideText);
        return this;
    };
    ;
    /**
     * Sets the title for the given slide type
     *
     * @param typeTitle the type of the slide
     * @param title the body text to put in the slide
     *
     * @returns {SlideshowGS} the object for chaining
     */
    SlideshowGS.prototype.setSlideTitleByType = function (typeTitle, title) {
        this.getSlideByType(typeTitle).setTitle(title);
        return this;
    };
    ;
    return SlideshowGS;
}(UiGS_1.UiGS));
exports.SlideshowGS = SlideshowGS;
