class SlideGS {
    _slide: GoogleAppsScript.Slides.Slide;
    _pageElements: Array<GoogleAppsScript.Slides.PageElement>;
    constructor(slideObject: GoogleAppsScript.Slides.Slide) {
      this._slide = slideObject;
      this._pageElements = this._slide.getPageElements();
    }
    
    replaceImage = function(picture: GoogleAppsScript.Base.BlobSource) {
      if (picture as GoogleAppsScript.Base.BlobSource) {
        for (var j = 0; j < this._pageElements.length; j++) {
          if (this._pageElements[j].getPageElementType() == SlidesApp.PageElementType.IMAGE) {
            this._pageElements[j].asImage().replace(picture);
            return j;
          }
        }
        throw new Error("Could not find picture on slide in Slide.replaceImage");
      } else {
        throw new Error("Picture not defined in Slide.replaceImage");
      }
    }

    getNotes = function() {
      return this._slide.getNotesPage().getSpeakerNotesShape().getText().asString();
    };

    setNotes = function(text: string) {
      if (text as string) {
        this._slide.getNotesPage().getSpeakerNotesShape().getText().setText(text);
        return this;
      } else {
        throw new Error("Notes text cannot be blank in Slide.setNotes");
      }
    };

    setTitle = function(title: string) {
      if (title as string) {
        this._slide.getPlaceholder(SlidesApp.PlaceholderType.TITLE).asShape().getText().setText(title);
        return this;
      } else {
        throw new Error("Slide title cannot be blank in Slide.setTitle");
      }
    };

    setBody = function(body: string) {
      if (body as string) { 
        this._slide.getPlaceholder(SlidesApp.PlaceholderType.BODY).asShape().getText().setText(body);   
        return this;
      } else {
        throw new Error("Body cannot be blank in Slide.setBody");
      }
    };

    getUpcomingDueDates = function(upcomingEvents: Array<CalendarEvent>) {
      var slideText = "";
      for (let event of upcomingEvents) {
        if (slideText != "") slideText += "\n";
        slideText += "\t" + event.getDate("MD", "/", ": ");
      }
      if (upcomingEvents.length == 0) slideText = "\tNone";
      this.setList(slideText);
    };
    
    setList = function(text: string) {
      if (text as string) { 
        this._slide.getPlaceholder(SlidesApp.PlaceholderType.BODY).asShape().getText().setText(text).getListStyle().applyListPreset(SlidesApp.ListPreset.DISC_CIRCLE_SQUARE);   
        return this;
      } else {
        throw new Error("Text cannot be blank in Slide.setList");
      }
    };
    
    addItems = function(questionOptions) {
      var choices = questionOptions.split("\n");
      let textRange: string;
      for (var choice in choices) {
        textRange += "\t" + choice + "\n";
      }
      this.setList(textRange);
      return this;
    };
    
    addItem = function(type, itemsToAdd) {
      switch (type) {
        case QUESTION_TYPE.TRUE_FALSE["string"]:
          this.setBody("True or False?");
          break;
        case QUESTION_TYPE.MULTIPLE_CHOICE["string"]:
          this.addItems(itemsToAdd);
          break;
        case QUESTION_TYPE.MULTIPLE_SELECT["string"]:
          this.addItems(itemsToAdd);
          break;
      }
      return this;
    };
    
    changePicture = function(chosenPictureBlob) {
      if (chosenPictureBlob as object) {
        for (var pictureId = 0; pictureId < this._pageElements.length; pictureId++) {
          if (this._pageElements[pictureId].getPageElementType() == SlidesApp.PageElementType.IMAGE) {
            this._pageElements[pictureId].asImage().replace(chosenPictureBlob);
            return pictureId;
          }
        }
        return null;
      } else {
        throw new Error("Slide and blob of chosen picture need to be defined in Slides.changePicture");
      }
    };
    
    positionPicture = function(id) {
      if (id as number) {
        if (this._pageElements as object) {
          if (this._pageElements[id] as object) {
            var height = this._pageElements[id].getHeight();
            var width = this._pageElements[id].getWidth();           
            if (height > width) {
              var newWidth = (this._dimensions.maxHeight / height) * width;
              this._pageElements[id].setWidth(newWidth);
              this._pageElements[id].setHeight(this._dimensions.maxHeight);
              this._pageElements[id].setLeft(this._dimensions.totalWidth - newWidth - 10);
              this._pageElements[id].setTop(this._dimensions.totalHeight - this._dimensions.maxHeight - 10);
            } else {
              var newHeight = (this._dimensions.maxWidth / width) * height;
              this._pageElements[id].setHeight(newHeight);
              this._pageElements[id].setWidth(this._dimensions.maxWidth);
              this._pageElements[id].setTop(this._dimensions.totalHeight - newHeight - 10);
              this._pageElements[id].setLeft(this._dimensions.totalWidth - this._dimensions.maxWidth - 10);
            }
            return this;
          } else {
            throw new Error("Could not get element id off of Slide object in Slides.positionPicture");
          }
        } else {
          throw new Error("Could not get slide specified by Slide object in Slides.positionPicture");
        }
      } else {
        throw new Error("ID and Slide need to be defined in Slides.positionPicture");
      }
    };
    
    getPageElements = function() {
      return this._pageElements;
    };

  };
  
