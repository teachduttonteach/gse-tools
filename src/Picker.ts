import { Settings } from './Settings';
import { MimeTypes } from './MimeTypes';
import { Features } from './Features';

/**
 * Raises a number to the given power, and returns the result.
 *
 * @param {number} base the number we're raising to a power
 * @param {number} exp the exponent we're raising the base to
 * @return {number} the result of the exponential calculation
 */
export class Picker {
  // this.pickerSettings = new Settings("PICKER");

  setDoc(dialogName: string, id: string) {
    // var s = new Settings();
    // s.set(dialogName, id);
  }

  show(dialogText: string, dialogName: string) {
    const m = MimeTypes;
    const f = Features;
    const settings: Settings = new Settings('Picker', false);
    settings.set('DIALOG_WIDTH', '600');
    settings.set('DIALOG_HEIGHT', '425');
    settings.set('INCLUDE_FOLDERS', 'true');
    //settings.set('MIME_TYPES', [m.DOCS, m.DRIVE_FILE]);
    //settings.set('FEATURES', [f.MULTISELECT_ENABLED]);

    const template = HtmlService.createTemplateFromFile('PickerBox.html');
    template.data = settings.get('Template');
    template.data['SELECTED_DOCUMENT'] = dialogName;
    const html = template
      .evaluate()
      .setWidth(+settings.get('DIALOG_WIDTH'))
      .setHeight(+settings.get('DIALOG_HEIGHT'));
    // Logger.log(html.getContent());
    return SpreadsheetApp.getUi().showModalDialog(html, dialogText);
  }
}

/**
 * Displays a sidebar.
 */
class Sidebar {
  constructor() {
    const htmlOutput = HtmlService.createHtmlOutput('<p>A change of speed, a change of style...</p>').setTitle(
      'My add-on',
    );
    SpreadsheetApp.getUi().showSidebar(htmlOutput);
  }
}
