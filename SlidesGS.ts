class SlidesGS {
  _presentation: GoogleAppsScript.Slides.Presentation;
  _allSlides: Array<SlideGS> = [];
  constructor(id: string = null) {
    this._presentation = SlidesApp.openById(id);
    for (let s of this._presentation.getSlides()) {
      this._allSlides.push(new SlideGS(s));
    }
  }
  
  _template = null;
  
  _dimensions = {
    totalHeight: 400,
    totalWidth: 720,
    maxHeight: 300,
    maxWidth: 250
  };

  addMenu = function(menuName: string, itemName: string, functionName: string) {
    if ((menuName as string) && (itemName as string) && (functionName as string)) {
      SlidesApp.getUi().createMenu(menuName).addItem(itemName, functionName).addToUi();
      return this;
    } else {
      throw new Error("You must specify menuName, itemName and functionName in Slides.addMenu");
    }
  };
  
  setTemplate = function(id: string) {
    if (id as string) {
      this._template = SlidesApp.openById(id);
      if (this._template as GoogleAppsScript.Slides) {
        throw new Error("Could not find requested Google Slides template in Slides.setTemplate");
      }
      return this;
    } else {
      throw new Error("Template id is not defined for Slides.setTemplate");
    }
  };
  
  setDimensions = function(tHeight: number = null, tWidth: number = null, mHeight: number = null, mWidth: number = null) {
    if ((tHeight as number) && (tWidth as number) && (mHeight as number) && (mWidth as number)) {
      this._dimensions.totalHeight = tHeight;
      this._dimensions.totalWidth = tWidth;
      this._dimensions.maxHeight = mHeight;
      this._dimensions.maxWidth = mWidth;
      return this;
    } else {
      throw new Error("Height and width of dimensions need to all be integers in Slides.setDimensions");
    }
  };
  
  changeSlidePicture = function(folder: string, slideNum?: number) {
    if (folder != "") {
      var chosenPicture = new this.DriveGS().getRandomPicture(folder);
      if (slideNum as undefined) slideNum = 1;
      this.getSlide(slideNum).positionPicture(this.changePicture(chosenPicture));
    }
  };
  
  getSlide = function(num: number) {
    if (num as number) {
      return this._allSlides[num];
    } else {
      throw new Error("Could not get slide #" + num + " from slideshow in Slides.getSlide");
    }
  };
  
  addSlide = function(title: string, text: string, id: string) {
    var slideAdded = {};
    if (this._template as GoogleAppsScript.Slides) {
      if (this._template.getSlides().length > 0) {
        var slideToGet = this._allSlides.length % this._template.getSlides().length;
        slideAdded = this._presentation.appendSlide(this._template.getSlides()[slideToGet]);
      } else {
        slideAdded = this._presentation.appendSlide(this._template.getSlides()[0]);
      } 
    } else {
        slideAdded = this._presentation.appendSlide();
    }
        
    return new this.SlideGS(slideAdded).setTitle(title).setBody(text).setNotes(id);
  };
  
  setTitle = function(slide: SlideGS, title: string) {
    if ((title as string) && (slide as SlideGS)) {
      slide.setTitle(title);
      return this;
    } else {
      throw new Error("Setting the title requires the Slide object and the title to be defined in Slides.setTitle");
    }
  };
  
  getSlideById = function(id: string) {
    if (id as string) {
      for (var j = 0; j < this._allSlides.length; j++) {
        if (this._allSlides[j].getNotes().indexOf(id) == 0) {
          return this._allSlides[j];
        }
      }
      return null;
    } else {
      throw new Error("ID is not defined to remove in Slides.getSlideById");
    }
  };
  
  removeSlide = function(id: string) {
    if (id as string) {
      this.getSlideById(id).slide.remove();
      return this;
    } else {
      throw new Error("ID is not defined to remove in Slides.removeSlide");
    }
  };
  
  getSlideByType = function(typeTitle: string) {
    var slide = this.getSlideById(typeTitle);
    if (slide as GoogleAppsScript.Slides.Slide) {
      return this.addSlide(typeTitle, "", typeTitle);
    } else {
      return slide;
    }
  };
  
  setSlideByType = function(typeTitle, slideText) {
    this.getSlideByType(typeTitle).setBody(slideText);
  };
}

