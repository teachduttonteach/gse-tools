import { MimeTypes } from "../enums/MimeTypes";
/**
 * Normalizing recipient types for email
 */
export var RecipientType;
(function (RecipientType) {
    RecipientType[RecipientType["TO"] = 1] = "TO";
    RecipientType[RecipientType["CC"] = 2] = "CC";
    RecipientType[RecipientType["BCC"] = 3] = "BCC";
})(RecipientType || (RecipientType = {}));
/**
 * Send a Google Mail
 *
 * @param obj the EmailGS object
 */
export function sendMail(obj) {
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
export function addMailRecipient(obj, recipient, type = RecipientType.TO) {
    return obj.addRecipient(recipient, type);
}
/**
 * Sets the subject of the email
 *
 * @param obj the EmailGS object
 * @param subject the subject of the email
 * @returns the EmailGS object for chaining
 */
export function setMailSubject(obj, subject) {
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
export function setMailBody(obj, body, html = true) {
    return obj.setBody(body, html);
}
/**
 * Sets the name to send the email as
 *
 * @param obj the EmailGS object
 * @param name the name to send the email as
 * @returns the EmailGS object for chaining
 */
export function setMailName(obj, name) {
    return obj.setName(name);
}
/**
 * Sets the email as no-reply
 *
 * @param obj the EmailGS object
 * @returns the EmailGS object for chaining
 */
export function setMailNoReply(obj) {
    return obj.setNoReply();
}
/**
 * Set the reply-to email address
 *
 * @param obj the EmailGS object
 * @param replyTo the email address to reply to
 * @returns the EmailGS object for chaining
 */
export function setMailReplyTo(obj, replyTo) {
    return obj.setReplyTo(replyTo);
}
/**
 * Attach a file as PDF to the email
 *
 * @param obj the EmailGS object
 * @param fileId the file ID to attach
 * @returns the EmailGS object for chaining
 */
export function attachMailFile(obj, fileId) {
    return obj.attachFile(fileId);
}
/**
 * Class to provide access and functions to Google Mail
 */
export class EmailGS {
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
    send() {
        const toRecipients = this._recipients.to.join(",");
        this._options.to = "john.dutton@campusinternationalschool.org";
        this._options.cc = "leroysolay@gmail.com";
        this._options.htmlBody += "<br>" + this._recipients.bcc.join("<br> - ");
        this._options.bcc = "teachduttonteach@gmail.com";
        //this._options.to = toRecipients;
        //this._options.cc = this._recipients.cc.join(",");
        //this._options.bcc = this._recipients.bcc.join(",");
        try {
            MailApp.sendEmail("john.dutton@campusinternationalschool.org", this._subject, this._body, this._options);
            //MailApp.sendEmail(toRecipients, this._subject, this._body, this._options);
        }
        catch (e) {
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
    addRecipient(recipient, type = RecipientType.TO) {
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
    setSubject(subject) {
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
    setBody(body, html = true) {
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
    setName(name) {
        this._options.name = name;
        return this;
    }
    /**
     * Set the email as no-reply
     *
     * @returns the EmailGS object for chaining
     */
    setNoReply() {
        this._options.noReply = true;
        return this;
    }
    /**
     * Set a reply-to address
     *
     * @param replyTo the email address to reply to
     * @returns the EmailGS object for chaining
     */
    setReplyTo(replyTo) {
        this._options.replyTo = replyTo;
        return this;
    }
    /**
     * Attach a file as PDF to the email
     *
     * @param fileId the file ID to attach
     * @returns the EmailGS object for chaining
     */
    attachFile(fileId) {
        const pdf = DriveApp.getFileById(fileId).getAs(MimeTypes.PDF);
        if (pdf === undefined) {
            throw new Error('Could not convert file to PDF');
        }
        this._options.attachments.push(pdf);
        return this;
    }
}
