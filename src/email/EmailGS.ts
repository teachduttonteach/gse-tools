import { MimeTypes } from "../enums/MimeTypes";

/**
 * Normalizing recipient types for email
 */
export enum RecipientType {
  TO = 1,
  CC = 2,
  BCC = 3
}

/**
 * Object to store the recipients for email
 */
export type Recipients = {
  to: Array<string>;
  cc: Array<string>;
  bcc: Array<string>;
}

/**
 * Send a Google Mail
 * 
 * @param obj the EmailGS object
 */
export function sendMail(obj: EmailGS) {
  obj.send();
}

/**
 * Adds a recipient to the email
 * 
 * @param obj the EmailGS object
 * @param recipient the email address
 * @param type whether it should be in the to, cc or bcc field
 * @returns the EmailGS object for chaining
 */
export function addMailRecipient(obj: EmailGS, recipient: string, type: RecipientType = RecipientType.TO): EmailGS {
  return obj.addRecipient(recipient, type);
}

/**
 * Sets the subject of the email
 * 
 * @param obj the EmailGS object
 * @param subject the subject of the email
 * @returns the EmailGS object for chaining
 */
export function setMailSubject(obj: EmailGS, subject: string): EmailGS {
  return obj.setSubject(subject);
}

/**
 * Sets the body of the email
 * 
 * @param obj the EmailGS object
 * @param body the body of the email
 * @param html whether to display it as HTML or not, defaults to true
 * @returns the EmailGS object for chaining
 */
export function setMailBody(obj: EmailGS, body: string, html: boolean = true): EmailGS {
  return obj.setBody(body, html);
}

/**
 * Sets the name to send the email as
 * 
 * @param obj the EmailGS object
 * @param name the name to send the email as
 * @returns the EmailGS object for chaining
 */
export function setMailName(obj: EmailGS, name: string): EmailGS {
  return obj.setName(name);
}

/**
 * Sets the email as no-reply
 * 
 * @param obj the EmailGS object
 * @returns the EmailGS object for chaining
 */
export function setMailNoReply(obj: EmailGS): EmailGS {
  return obj.setNoReply();
}

/**
 * Set the reply-to email address
 * 
 * @param obj the EmailGS object
 * @param replyTo the email address to reply to
 * @returns the EmailGS object for chaining
 */
export function setMailReplyTo(obj: EmailGS, replyTo: string): EmailGS {
  return obj.setReplyTo(replyTo);
}

/**
 * Attach a file as PDF to the email
 * 
 * @param obj the EmailGS object
 * @param fileId the file ID to attach
 * @returns the EmailGS object for chaining
 */
export function attachMailFileAsPDF(obj: EmailGS, fileId: string): EmailGS {
  return obj.attachFileAsPDF(fileId);
}

/**
 * Attach a file  to the email
 * 
 * @param obj the EmailGS object
 * @param fileId the file ID to attach
 * @returns the EmailGS object for chaining
 */
 export function attachMailFile(obj: EmailGS, file: GoogleAppsScript.Base.BlobSource): EmailGS {
  return obj.attachFile(file);
}

/**
 * Class to provide access and functions to Google Mail
 */
export class EmailGS {
  protected _recipients: Recipients;
  protected _subject: string;
  protected _body: string;
  protected _options: GoogleAppsScript.Mail.MailAdvancedParameters;

  /**
   * Creating empty parameters for email
   */
  constructor() {
    this._recipients = {
      to: [],
      cc: [],
      bcc: []
    };
    this._subject = "";
    this._body = "";
    this._options = {
      attachments: [],
      bcc: "",
      cc: "",
      body: "",
      htmlBody: "",
      noReply: false,
      subject: "",
      to: ""
    };
  }

  /**
   * Send the email
   */
  send(testing: boolean = true) {
    const toRecipients = this._recipients.to.join(",");
    if (testing) {
      this._options.to = TESTING_EMAIL_TO;
      this._options.cc = TESTING_EMAIL_CC;
      this._options.htmlBody += "<br>" + this._recipients.bcc.join("<br> - ");
      this._options.bcc = TESTING_EMAIL_BCC;
    } else {
      this._options.to = toRecipients;
      this._options.cc = this._recipients.cc.join(",");
      this._options.bcc = this._recipients.bcc.join(",");
  }
    try {
      MailApp.sendEmail(this._options.to, this._subject, this._body, this._options);
    } catch (e) {
      throw new Error("Error sending mail: " + e);
    }
  }
  
  /**
   * Adds a recipient to the email
   * 
   * @param recipient the email address
   * @param type whether it should be sent to, cc or bcc
   * @returns the EmailGS object for chaining
   */
  addRecipient(recipient: string, type: RecipientType = RecipientType.TO): EmailGS {
    if (type == RecipientType.TO)
      this._recipients.to.push(recipient);
    else if (type == RecipientType.CC)
      this._recipients.cc.push(recipient);
    else if (type == RecipientType.BCC)
      this._recipients.bcc.push(recipient);
    return this;
  }

  /**
   * Sets the subject of the email
   * 
   * @param subject the subject of the email
   * @returns the EmailGS object for chaining
   */
  setSubject(subject: string): EmailGS {
    this._subject = subject;
    this._options.subject = subject;
    return this;
  }

  /**
   * Sets the body of the email
   * 
   * @param body the body of the email
   * @param html whether to send the email as html or not, defaults to true
   * @returns the EmailGS object for chaining
   */
  setBody(body: string, html: boolean = true): EmailGS {
    this._body = body;
    this._options.body = body;
    if (html)
      this._options.htmlBody = body;
    return this;
  }

  /**
   * Set the email to send the email as
   * 
   * @param name the name to send the email as
   * @returns the EmailGS object for chaining
   */
  setName(name: string): EmailGS {
    this._options.name = name;
    return this;
  }

  /**
   * Set the email as no-reply
   * 
   * @returns the EmailGS object for chaining
   */
  setNoReply(): EmailGS {
    this._options.noReply = true;
    return this;
  }

  /**
   * Set a reply-to address
   * 
   * @param replyTo the email address to reply to
   * @returns the EmailGS object for chaining
   */
  setReplyTo(replyTo: string): EmailGS {
    this._options.replyTo = replyTo;
    return this;
  }

  /**
   * Attach a file as PDF to the email
   * 
   * @param fileId the file ID to attach
   * @returns the EmailGS object for chaining
   */
  attachFileAsPDF(fileId: string): EmailGS {
    const pdf = DriveApp.getFileById(fileId).getAs(MimeTypes.PDF);
    if (pdf === undefined) {
      throw new Error('Could not convert file to PDF');
    }
    this._options.attachments!.push(pdf);
    return this;
  }

  /**
   * Attach a file to the email
   * 
   * @param file the file ID to attach
   * @returns the EmailGS object for chaining
   */
   attachFile(file: GoogleAppsScript.Base.BlobSource): EmailGS {
    this._options.attachments!.push(file);
    return this;
  }
}
