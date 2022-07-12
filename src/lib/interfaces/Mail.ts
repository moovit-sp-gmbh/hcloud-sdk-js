export enum Template {
    REGISTER = "register",
    RESET_PASSWORD = "reset_password",
}

export interface Mail {
    recipients: string[];
    subject: string;
}

export interface MailReplacement {
    key: string;
    value: string;
}

export interface TemplateMail extends Mail {
    template: Template;
    replacements: MailReplacement[];
}

/**
 * @param html base64 encoded html string
 */
export interface HtmlMail extends Mail {
    html: string;
}

/**
 * @param html base64 encoded html string
 */
export interface MustacheMail extends Mail {
    html: string;
    replacements: MailReplacement[];
}
