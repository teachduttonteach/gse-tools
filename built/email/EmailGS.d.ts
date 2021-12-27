/// <reference types="google-apps-script" />
/**
 * Normalizing recipient types for email
 */
export declare enum RecipientType {
    TO = 1,
    CC = 2,
    BCC = 3
}
/**
 * Object to store the recipients for email
 */
export declare type Recipients = {
    to: Array<string>;
    cc: Array<string>;
    bcc: Array<string>;
};
/**
 * Send a Google Mail
 *
 * @param obj the EmailGS object
 */
export declare function sendMail(obj: EmailGS): void;
/**
 * Adds a recipient to the email
 *
 * @param obj the EmailGS object
 * @param recipient the email address
 * @param type whether it should be in the to, cc or bcc field
 * @returns the EmailGS object for chaining
 */
export declare function addMailRecipient(obj: EmailGS, recipient: string, type?: RecipientType): EmailGS;
/**
 * Sets the subject of the email
 *
 * @param obj the EmailGS object
 * @param subject the subject of the email
 * @returns the EmailGS object for chaining
 */
export declare function setMailSubject(obj: EmailGS, subject: string): EmailGS;
/**
 * Sets the body of the email
 *
 * @param obj the EmailGS object
 * @param body the body of the email
 * @param html whether to display it as HTML or not, defaults to true
 * @returns the EmailGS object for chaining
 */
export declare function setMailBody(obj: EmailGS, body: string, html?: boolean): EmailGS;
/**
 * Sets the name to send the email as
 *
 * @param obj the EmailGS object
 * @param name the name to send the email as
 * @returns the EmailGS object for chaining
 */
export declare function setMailName(obj: EmailGS, name: string): EmailGS;
/**
 * Sets the email as no-reply
 *
 * @param obj the EmailGS object
 * @returns the EmailGS object for chaining
 */
export declare function setMailNoReply(obj: EmailGS): EmailGS;
/**
 * Set the reply-to email address
 *
 * @param obj the EmailGS object
 * @param replyTo the email address to reply to
 * @returns the EmailGS object for chaining
 */
export declare function setMailReplyTo(obj: EmailGS, replyTo: string): EmailGS;
/**
 * Attach a file as PDF to the email
 *
 * @param obj the EmailGS object
 * @param fileId the file ID to attach
 * @returns the EmailGS object for chaining
 */
export declare function attachMailFile(obj: EmailGS, fileId: string): EmailGS;
/**
 * Class to provide access and functions to Google Mail
 */
export declare class EmailGS {
    protected _recipients: Recipients;
    protected _subject: string;
    protected _body: string;
    protected _options: GoogleAppsScript.Mail.MailAdvancedParameters;
    /**
     * Creating empty parameters for email
     */
    constructor();
    /**
     * Send the email
     */
    send(): void;
    /**
     * Adds a recipient to the email
     *
     * @param recipient the email address
     * @param type whether it should be sent to, cc or bcc
     * @returns the EmailGS object for chaining
     */
    addRecipient(recipient: string, type?: RecipientType): EmailGS;
    /**
     * Sets the subject of the email
     *
     * @param subject the subject of the email
     * @returns the EmailGS object for chaining
     */
    setSubject(subject: string): EmailGS;
    /**
     * Sets the body of the email
     *
     * @param body the body of the email
     * @param html whether to send the email as html or not, defaults to true
     * @returns the EmailGS object for chaining
     */
    setBody(body: string, html?: boolean): EmailGS;
    /**
     * Set the email to send the email as
     *
     * @param name the name to send the email as
     * @returns the EmailGS object for chaining
     */
    setName(name: string): EmailGS;
    /**
     * Set the email as no-reply
     *
     * @returns the EmailGS object for chaining
     */
    setNoReply(): EmailGS;
    /**
     * Set a reply-to address
     *
     * @param replyTo the email address to reply to
     * @returns the EmailGS object for chaining
     */
    setReplyTo(replyTo: string): EmailGS;
    /**
     * Attach a file as PDF to the email
     *
     * @param fileId the file ID to attach
     * @returns the EmailGS object for chaining
     */
    attachFile(fileId: string): EmailGS;
}
