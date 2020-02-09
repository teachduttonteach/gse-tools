# gse-tools
A library specifically built to more easily write [Google Apps Script](https://developers.google.com/apps-script) code in an educational context.

## Usage

    

## Apps Script Libraries
The following is a list of all of the libraries you can import into Google Apps Script, by clicking on Resources > Libraries ... > Add a Library. Once you import a library, you will have autocomplete access to functions and objects by typing the library name (without dashes): 

    var mySpreadsheet = new gsetools.SpreadsheetGS()
    
Unfortunately, the Google Apps Script interface does not allow autocomplete access to object methods. You can use all of the libraries in either function-based or object-oriented ways. See "TypeScript & Modules" and "Accessing from Apps Script" below for more information.

### gse-tools
Project key: `1SRl5DGs_tVG42joBNHBFhPvivWtX07XRmIo533wfxzXgkM4ahPT8E5JA`

Provides access to [all modules](https://teachduttonteach.github.io/gse-tools/globals.html).

### gse-tools-calendar
Project key: `1BIyKATbtLvr3qIoeXWcN9G4r14CycOEY3J1i9YPYnaJbDpAHiE12jDhM`

Files: [CalendarGS](https://teachduttonteach.github.io/gse-tools/classes/calendargs.html), [CalendarEventGS](https://teachduttonteach.github.io/gse-tools/classes/calendareventgs.html), [MapGS](https://teachduttonteach.github.io/gse-tools/classes/mapgs.html)

### gse-tools-classroom
Project key: `1m0hA-zfY5a-k1tV78D0KKjbIIWvQ0lQV8TndN7AsJghK8etQSi5MZ4MT`

Files: [ClassroomGS](https://teachduttonteach.github.io/gse-tools/classes/classroomgs.html), [ClassGS](https://teachduttonteach.github.io/gse-tools/classes/classgs.html), [CourseAnnouncementGS](https://teachduttonteach.github.io/gse-tools/classes/courseannouncementgs.html), [CourseWorkGS](https://teachduttonteach.github.io/gse-tools/classes/courseworkgs.html), [MapGS](https://teachduttonteach.github.io/gse-tools/classes/mapgs.html)

### gse-tools-classroom-docs
Project key: `1ZSjCQUyZZpEESUSAd_7DEN3-kg8SDAiE-yjx8zlIlHwTFK6OO0uAlmpq`

Files: [ClassroomDocsGS](https://teachduttonteach.github.io/gse-tools/classes/classroomdocsgs.html), [ClassGS](https://teachduttonteach.github.io/gse-tools/classes/classgs.html), [DocsGS](https://teachduttonteach.github.io/gse-tools/classes/docsgs.html), [MapGS](https://teachduttonteach.github.io/gse-tools/classes/mapgs.html), [UiGS](https://teachduttonteach.github.io/gse-tools/classes/uigs.html)

### gse-tools-docs
Project key: `1nxNF1z8ZVH83OdBfJLqLEgW04Sd4bQZn4q5Ryx-0WVcrK6qHkcM1yhnP`

Files: [DocsGS](https://teachduttonteach.github.io/gse-tools/classes/docsgs.html), [MapGS](https://teachduttonteach.github.io/gse-tools/classes/mapgs.html), [UiGS](https://teachduttonteach.github.io/gse-tools/classes/uigs.html)

### gse-tools-drive
Project key: `1PlSc90WZcf1Jah-VrmsdECaavaRP18FHnyCWe4HRuw7bX09c2e9aFDvV`

Files: [DriveGS](https://teachduttonteach.github.io/gse-tools/classes/drivegs.html)

### gse-tools-forms
Project key: `1oyfsFWcowJSVKND18FrPkDklCVMyhEEOW05EJ_eo-QoZDhxD85QnfFSL`

Files: [FormsGS](https://teachduttonteach.github.io/gse-tools/classes/formsgs.html), [FormEventGS](https://teachduttonteach.github.io/gse-tools/classes/formeventgs.html), [MapGS](https://teachduttonteach.github.io/gse-tools/classes/mapgs.html), [UiGS](https://teachduttonteach.github.io/gse-tools/classes/uigs.html)

### gse-tools-sheets
Project key: `11-VQGNfjMaZaW_8DgTSwVXEPdZSMAZVOhEHZsLCkeLkJppGRmJyOYsFe`

Files: [SpreadsheetGS](https://teachduttonteach.github.io/gse-tools/classes/spreadsheetgs.html), [SheetGS](https://teachduttonteach.github.io/gse-tools/classes/sheetgs.html), [MapGS](https://teachduttonteach.github.io/gse-tools/classes/mapgs.html), [UiGS](https://teachduttonteach.github.io/gse-tools/classes/uigs.html)

### gse-tools-slides
Project key: `1wn-OnB6Yzt_2BMSCqxsnTZ3Q7gCARLK18eTjWcakluqDip3TXizfCwRa`

Files: [SlideshowGS](https://teachduttonteach.github.io/gse-tools/classes/slideshowgs.html), [SlideGS](https://teachduttonteach.github.io/gse-tools/classes/slidegs.html), [MapGS](https://teachduttonteach.github.io/gse-tools/classes/mapgs.html), [UiGS](https://teachduttonteach.github.io/gse-tools/classes/uigs.html)

### Samples
Agenda: [updateDailyAgenda()](https://teachduttonteach.github.io/gse-tools/globals.html#updatedailyagenda)
* Creates an agenda as a Google Doc from the information in Google Classroom and a Google Sheet containing lesson information ([sample lesson info](https://docs.google.com/spreadsheets/d/1_CwCHD1QqwM-5Mw458Uu4nzTBGJ40Ffx7LPKk5peq4Y/edit?usp=sharing)). Also can send e-mails to parents as defined in Google Classroom. Gets settings from a Google Sheet ([sample settings sheet](https://docs.google.com/spreadsheets/d/1mJCt77JaMPrV-bqU62PVK7DT6BPF-eDCsDpLLvVJlgk)).

Attendance: [changeAttendance()](https://teachduttonteach.github.io/gse-tools/globals.html#changeattendance)
* Acts on a Google Sheet when the Sheet is updated to reflect saved student attendance in another sheet ([sample attendance sheet](https://docs.google.com/spreadsheets/d/1ml1J53j9h63g-6Qe_-WJq3g3gaVs_IrVDJpTiCTla40/edit?usp=sharing)).

Bellwork: [updateBellwork()](https://teachduttonteach.github.io/gse-tools/globals.html#updatebellwork)
* Updates the Bellwork from a Google Sheet ([sample lesson info](https://docs.google.com/spreadsheets/d/1_CwCHD1QqwM-5Mw458Uu4nzTBGJ40Ffx7LPKk5peq4Y/)) to a Google Form ([sample form](https://docs.google.com/forms/d/1dR4vnuy2xVpnumrtLacN8-4jTgtsftS_6swIjMuo6d8/edit?usp=sharing)) and a Google Slides ([sample slides](https://docs.google.com/presentation/d/1RZvg-ldOQRJQNvRx-H5YmwWez0AwElif8gO28UZlQAU/edit?usp=sharing)) document. When students complete the Bellwork, then it writes the answer and name back to a Google Sheet. Settings are stored in a Google Sheet ([sample sheet](https://docs.google.com/spreadsheets/d/1mJCt77JaMPrV-bqU62PVK7DT6BPF-eDCsDpLLvVJlgk))

Birthday: [sendBirthdayEmail()](https://teachduttonteach.github.io/gse-tools/globals.html#sendbirthdayemail)
* Can be used as a trigger to send an automatic email about student birthdays. Links to a Google Sheet with the student data ([sample sheet](https://docs.google.com/spreadsheets/d/1ml1J53j9h63g-6Qe_-WJq3g3gaVs_IrVDJpTiCTla40/edit?usp=sharing)).

ClassroomFiles: [updateClassroomFiles()](https://teachduttonteach.github.io/gse-tools/globals.html#updateclassroomfiles)
* Creates Google Docs for each topic within the specified Google Classes on a data sheet ([sample sheet](https://docs.google.com/spreadsheets/d/1mJCt77JaMPrV-bqU62PVK7DT6BPF-eDCsDpLLvVJlgk)).

## Purpose & G Suite for Education

Google Apps Script (GAS) offers a flexible, comprehensive library that has been harnessed by professionals and hobbyists across the world. Since [G Suite for Education](https://edu.google.com/products/gsuite-for-education/?modal_active=none) has proliferated in school districts, more educators and technology officers have taken advantage of the GAS library to improve their workflow and student experience. But there are still three main problems:

* Most educators don't know how to code
* There are idiosyncrasies in the GAS library that require digging through documentation and discussion boards in order to solve
* Some apps, like Sheets, require high numbers of API calls to do simple tasks, slowing scripts down

While this project cannot magically impart basic coding skills to teachers, the **aims** of the project can help bridge the gap between professional programmer and the average educator:

- Provide a library that reduces common complex education-focused tasks to one function or method
    - In GAS, to add a list to a slide, you could call `slide.getPlaceholder(SlidesApp.PlaceholderType.BODY).asShape().getText().setText(text).getListStyle().applyListPreset(bulletType);`
    - In **gse-tools**, the code is simplified: `slide.setList(listText);`
- Hide GAS idiosyncrasies in modules, improving coding efficiency at the expense of code flexibility
- Reduce API calls where possible
    - In GAS, searching for the value of a cell in a Sheet can require an API call to the Sheet for every single cell searched
    - In **gse-tools**, all of the cell values are held in a variable and can be searched multiple times with no expensive API calls
- Allow for programmers with a wider variety of experience levels to use the library

## JavaScript, TypeScript & Classes

#### The GAS Editor
The [Google Apps Script Editor](https://script.google.com) uses JavaScript as its programming language. A variety of libraries are available automatically (e.g., `DocumentApp` to access Google Docs), through [Advanced Google Services](https://developers.google.com/apps-script/guides/services/advanced) (e.g., `Classroom` for the [Google Classroom API](https://developers.google.com/classroom)), or by entering the library project key just as this library is used. 

#### Attachment Points
Scripts can be created and run within the context of a [Google Document](https://docs.google.com), [Sheet](https://sheets.google.com), [Form](https://forms.google.com) or [Slide](https://slides.google.com). These scripts can be triggered to run when certain events occur, such as when submitting a form. Scripts can also be created independently of any particular App, and can be triggered to run on a regular basis (e.g., daily). 

#### Manifestations
Scripts can be written to be standalone and be executed in the background when triggered, or the [App UI can be manipulated](https://developers.google.com/apps-script/guides/menus) to create an option to run or use a particular script. Scripts can also be converted to [web apps](https://developers.google.com/apps-script/guides/web), [add-ons](https://developers.google.com/gsuite/add-ons/overview) or [API executables](https://developers.google.com/apps-script/api/how-tos/execute). 

#### TypeScript & `clasp`
[TypeScript](https://www.typescriptlang.org/index.html) is "a typed superset of JavaScript that compiles to plain JavaScript." You can use TypeScript to write better code, and then use the [`clasp`](https://developers.google.com/apps-script/guides/clasp) command-line tool to interact between your IDE where you are developing TypeScript and Google Apps Script. When `clasp` runs, it converts TypeScript to the version of JavaScript that is used by Google Apps Script, ES3. Since TypeScript files converted to GAS files, quite a bit of meaningful code is lost in the conversion. TypeScript files should be maintained in a separate repository (like GitHub). [Refer to this page](https://developers.google.com/apps-script/guides/typescript) to see how to write using TypeScript & `clasp`. The primary IDE used to develop this library was [Visual Studio Code](https://code.visualstudio.com/), a free tool.

#### Classes
JavaScript supports [object-oriented code](https://en.wikipedia.org/wiki/Object-oriented_programming). Google Apps Script libraries are written as object-oriented libraries, and the autocomplete tool in the script editor helps programmers write code more efficiently. However, when using external libraries, the script editor does not autocomplete object methods (e.g. `SpreadsheetGS.getSheet()`) only global functions and objects themselves. [Read more about developing and using external libraries here.](https://developers.google.com/apps-script/guides/libraries) An example of object-oriented behavior in **gse-tools**:

    // Get completed tasks (with percentage and comments) for a student
    var sheets = new gsetools.SpreadsheetGS();
    var studentGrades = sheets.getSheet("Grades").getRecordsMatchingColumnValue("Name", "John Joe", ["Task", "%", "Comments"]);

Since autocomplete is a critical aspect of efficient programming, many programmers are discouraged from using external libraries in GAS that are object-oriented.

#### Functions
In order to address this concern, **gse-tools** has been written in both object-oriented and procedural (function) styles. Global functions are included in GAS autocomplete, so all object methods in **gse-tools** have been wrapped in functions that take as their first argument the object to be acted upon. Constructors are written in the format `newObjectName()` and return the requested object. For example:

    // Get completed tasks (with percentage and comments) for a student
    var sheets = new gsetools.newSpreadsheet();
    var gradeSheet = gsetools.getSheet(sheets, "Grades");
    var studentGrades = gsetools.getSheetRecordsMatchingColumnValue(gradeSheet, "Name", "John Joe", ["Task", "%", "Comments]);

#### getObject()
The intent of this library is not to funnel all programmatic access to GAS through the library itself. **gse-tools** can and should be used alongside GAS code. Every class in this library has a `getObject()` method which returns the underlying GAS object for direct access. If using the functions for library access, the class name goes between `get` and `object()`, e.g., `getSheetObject()`.

<footer>&copy; 2020 John A. Dutton</footer>
