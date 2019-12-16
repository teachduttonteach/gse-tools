

class FormsGS {
  _form: GoogleAppsScript.Forms.Form;
  constructor(id: string) {
    if (id as string) {
      this._form = FormApp.openById(id);
    } else {
      throw new Error("Form id needs to be defined in Form(): " + id);
    }
    if (this._form as undefined) throw new Error("Form not found in Form()");
  }
  
  addMenu = function(menuName: string, itemName: string, functionName: string) {
    if ((menuName as string) && (itemName as string) && (functionName as string)) {
      FormApp.getUi().createMenu(menuName).addItem(itemName, functionName).addToUi();
      return this;
    } else {
      throw new Error("menuName, itemName and functionName need to be defined for Form.addMenu");
    }
  };
  
  //addItem = function(title: string = null, row: number = null, questionType: string = null, optionsColumn: number = null, mcGridRowsColumn: number = null) {
  addItem = function(title: string = null, questionType: string = null, optionsList: string = null, mcGridRowsList: string = null) {
    switch (questionType) {
      case QUESTION_TYPE.PARAGRAPH["string"]:
        this._form.addParagraphTextItem().setTitle(title);
        break;
      case QUESTION_TYPE.TRUE_FALSE["string"]:
        this._form.addMultipleChoiceItem().setTitle(title).setChoiceValues(["True", "False"]);
        break;
      case QUESTION_TYPE.MULTIPLE_CHOICE["string"]:
        this._form.addMultipleChoiceItem().setTitle(title);
        this.addMultiple("choice", title, optionsList);
        break;
      case QUESTION_TYPE.MULTIPLE_SELECT["string"]:
        this._form.addCheckboxItem().setTitle(title);
        this.addMultiple("select", title, optionsList);
        break;
      case QUESTION_TYPE.MC_GRID["string"]:
        var item = this._form.addGridItem().setTitle(title);
        item.setColumns(optionsList);
        item.setRows(mcGridRowsList);
        break;
      case QUESTION_TYPE.MS_GRID["string"]:
        var item = this._form.addCheckboxGridItem().setTitle(title);
        item.setColumns(optionsList);
        item.setRows(mcGridRowsList);
        break;
      default:
        this._form.addParagraphTextItem().setTitle(title);
        break;
    }
    
  };

  addParagraph = function(title: string) {
    if (title as string) {
      this._form.addParagraphTextItem().setTitle(title);
      return this;
    } else {
      throw new Error("Title needs to be defined for Form.addParagraph");
    }
  };
  
  addTrueFalse = function(title: string) {
    if (title as string) {
      this.addMultiple("choice", title, ["True", "False"], false);
      return this;
    } else {
      throw new Error("Title needs to be defined for Form.addTrueFalse");
    }
  };
  
  setChoices = function(list: Array<string>) {
    if (list as Array<string>) {
      this._form.setChoices(list);
      return this;
    } else {
      throw new Error("List and form need to be defined for Form.setChoices");
    }
  }
  
  addMultiple = function(type: string, title: string, items: Array<string> = [], convert?: boolean) {
    if ((type as string) && (title as string) && (items as Array<string>)) {
      let mcItem: GoogleAppsScript.Forms.MultipleChoiceItem = null;
      if (type == "choice") mcItem = this._form.addMultipleChoiceItem().setTitle(title);
      else mcItem = this._form.addCheckboxItem().setTitle(title);
      if (convert) items = this.setChoices(items);
      mcItem.setChoiceValues(items);
      return this;
    } else {
      throw new Error("Type, title and items need to be defined for Form.addMultiple");
    }
  };

  addMultipleGrid = function(type: string, title: string, columns: Array<string>, rows: Array<string>) {
    if ((type as string) && (title as string) && (columns as Array<string>) && (rows as Array<string>)) {
      var mcItem: GoogleAppsScript.Forms.GridItem = null;
      if (type == "choice") mcItem = this._form.addGridItem().setTitle(title);
      else mcItem = this._form.addCheckboxGridItem().setTitle(title);
      mcItem.setColumns(columns);
      mcItem.setRows(rows);
      return this;
    } else {
      throw new Error("Type, title, columns and rows need to be defined for Form.addMultipleGrid");
    }
  };
  
  addImage = function(file) {
    this._form.addImageItem().setImage(file);
  };
  
  deleteItems = function() {
    for (let i = this._form.getItems().length - 1; i >= 0; i--) {
      this._form.deleteItem(i);
    }
    this._form.deleteAllResponses();
    return this;
  };      
};


