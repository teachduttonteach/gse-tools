# gse-tools
A library specifically built to more easily write Google Apps Script code in an educational context.

## Usage

    

## Apps Script Libraries
The following is a list of all of the libraries you can import into Google Apps Script, by clicking on Resources > Libraries ... > Add a Library. Once you import a library, you will have autocomplete access to functions and objects by typing the library name (without dashes): 

    var mySpreadsheet = new gsetools.SpreadsheetGS()
    
Unfortunately, the Google Apps Script interface does not allow autocomplete access to object methods. You can use all of the libraries in either function-based or object-oriented ways. See "TypeScript & Modules" and "Accessing from Apps Script" below for more information.

### gse-tools
Project key: `1qNPRbBbOQhFX9sLa8LzH_YYcceEDSC6hgO9500fgTyFXMNXdoEcjqlPv`

Provides access to [all modules](https://teachduttonteach.github.io/gse-tools/globals.html).

### gse-tools-calendar
Project key: `1BIyKATbtLvr3qIoeXWcN9G4r14CycOEY3J1i9YPYnaJbDpAHiE12jDhM`

Modules: [CalendarGS](https://teachduttonteach.github.io/gse-tools/classes/calendargs.html), [CalendarEventGS](https://teachduttonteach.github.io/gse-tools/classes/calendareventgs.html), [MapGS](https://teachduttonteach.github.io/gse-tools/classes/mapgs.html)

### gse-tools-classroom
Project key: `1m0hA-zfY5a-k1tV78D0KKjbIIWvQ0lQV8TndN7AsJghK8etQSi5MZ4MT`

Modules: [ClassroomGS](https://teachduttonteach.github.io/gse-tools/classes/classroomgs.html), [ClassGS](https://teachduttonteach.github.io/gse-tools/classes/classgs.html), [CourseAnnouncementGS](https://teachduttonteach.github.io/gse-tools/classes/courseannouncementgs.html), [CourseWorkGS](https://teachduttonteach.github.io/gse-tools/classes/courseworkgs.html), [MapGS](https://teachduttonteach.github.io/gse-tools/classes/mapgs.html)

### gse-tools-classroom-docs
Project key: `1ZSjCQUyZZpEESUSAd_7DEN3-kg8SDAiE-yjx8zlIlHwTFK6OO0uAlmpq`

Modules: [ClassroomDocsGS](https://teachduttonteach.github.io/gse-tools/classes/classroomdocsgs.html), [ClassGS](https://teachduttonteach.github.io/gse-tools/classes/classgs.html), [DocsGS](https://teachduttonteach.github.io/gse-tools/classes/docsgs.html), [MapGS](https://teachduttonteach.github.io/gse-tools/classes/mapgs.html), [UiGS](https://teachduttonteach.github.io/gse-tools/classes/uigs.html)

### gse-tools-docs
Project key: `1nxNF1z8ZVH83OdBfJLqLEgW04Sd4bQZn4q5Ryx-0WVcrK6qHkcM1yhnP`

Modules: [DocsGS](https://teachduttonteach.github.io/gse-tools/classes/docsgs.html), [MapGS](https://teachduttonteach.github.io/gse-tools/classes/mapgs.html), [UiGS](https://teachduttonteach.github.io/gse-tools/classes/uigs.html)

### gse-tools-drive
Project key: `1PlSc90WZcf1Jah-VrmsdECaavaRP18FHnyCWe4HRuw7bX09c2e9aFDvV`

Modules: [DriveGS](https://teachduttonteach.github.io/gse-tools/classes/drivegs.html)

### gse-tools-drive-sheets
Project key: `1HEULrHr3_l8Np8a4ya40KCPf3y0MkENHOdB3gVZpzHuXvqmQLPMZu8qj`

Modules: [SpreadsheetGS](https://teachduttonteach.github.io/gse-tools/classes/spreadsheetgs.html), [SheetGS](https://teachduttonteach.github.io/gse-tools/classes/sheetgs.html), [DriveGS](https://teachduttonteach.github.io/gse-tools/classes/drivegs.html), [MapGS](https://teachduttonteach.github.io/gse-tools/classes/mapgs.html), [UiGS](https://teachduttonteach.github.io/gse-tools/classes/uigs.html)

### gse-tools-forms
Project key: `1oyfsFWcowJSVKND18FrPkDklCVMyhEEOW05EJ_eo-QoZDhxD85QnfFSL`

Modules: [FormsGS](https://teachduttonteach.github.io/gse-tools/classes/formsgs.html), [FormEventGS](https://teachduttonteach.github.io/gse-tools/classes/formeventgs.html), [MapGS](https://teachduttonteach.github.io/gse-tools/classes/mapgs.html), [UiGS](https://teachduttonteach.github.io/gse-tools/classes/uigs.html)

### gse-tools-samples
Project key: `1KuJA0xJvdhTKbQhS3b8Yum-tiYbON8YqsWel3-_EigCTdo7QIWrlRth1`

### gse-tools-sheets
Project key: `11-VQGNfjMaZaW_8DgTSwVXEPdZSMAZVOhEHZsLCkeLkJppGRmJyOYsFe`

Modules: [SpreadsheetGS](https://teachduttonteach.github.io/gse-tools/classes/spreadsheetgs.html), [SheetGS](https://teachduttonteach.github.io/gse-tools/classes/sheetgs.html), [MapGS](https://teachduttonteach.github.io/gse-tools/classes/mapgs.html), [UiGS](https://teachduttonteach.github.io/gse-tools/classes/uigs.html)

### gse-tools-slides
Project key: `1wn-OnB6Yzt_2BMSCqxsnTZ3Q7gCARLK18eTjWcakluqDip3TXizfCwRa`

Modules: [SlideshowGS](https://teachduttonteach.github.io/gse-tools/classes/slideshowgs.html), [SlideGS](https://teachduttonteach.github.io/gse-tools/classes/slidegs.html), [MapGS](https://teachduttonteach.github.io/gse-tools/classes/mapgs.html), [UiGS](https://teachduttonteach.github.io/gse-tools/classes/uigs.html)

## Purpose & G Suite for Education

Google Apps Script (GAS) for G Suite Apps offers a flexible, comprehensive API that has been harnessed by professionals and hobbyists across the world. Since G Suite for Education has proliferated in school districts, more educators and technology officers have taken advantage of the API to improve their workflow and student experience. But there are still three main problems:

* Most educators don't know how to code
* There are idiosyncracies in the API that require digging through documentation and discussion boards in order to solve
* Some apps, like Sheets, require high numbers of API calls to do simple tasks, slowing scripts down

While this project cannot magically impart basic coding skills to teachers, the **aims** of the project can help bridge the gap between professional programmer and the average educator:

- Provide a library that reduces common complex education-focused tasks to one function or method
- Hide GAS idiosyncracies in modules, improving coding efficiency at the expense of code flexibility
- Reduce G Suite API calls where possible
- Allow for programmers with a wider variety of experience levels to use the library

## TypeScript & Modules



## Accessing from Apps Script

## Functions

<footer>&copy; 2020 John A. Dutton</footer>
