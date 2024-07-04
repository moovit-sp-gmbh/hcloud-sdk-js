export enum Template {
    REGISTER = "register",
    RESET_PASSWORD = "reset_password",
    INVITE_TO_ORG = "invite_to_org",
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

enum MailjetTemplate {
    IDP_NEW_REGISTRATION = "IDP_NEW_REGISTRATION",
    IDP_NEW_REGISTRATION_CUSTOMER = "IDP_NEW_REGISTRATION_CUSTOMER",
    IDP_INVITE_TO_ORGANIZATION = "IDP_INVITE_TO_ORGANIZATION",
    IDP_RESET_PASSWORD = "IDP_RESET_PASSWORD",
    IDP_REGISTRATION_AND_INVITATION = "IDP_REGISTRATION_AND_INVITATION",
    IDP_USER_LEFT_ORGANIZATION = "IDP_USER_LEFT_ORGANIZATION",
}

interface MailjetTemplateField {
    [key: string]: string;
}

export abstract class MailjetMailDTO {
    public recipients: string[];
    public template: MailjetTemplate;
    public fields: MailjetTemplateField;

    constructor(recipients: string[], template: MailjetTemplate, fields: MailjetTemplateField) {
        this.recipients = recipients;
        this.template = template;
        this.fields = fields;
    }
}

export class IdpNewRegistrationMailjetMailDTO extends MailjetMailDTO {
    constructor(recipients: string[], verifyLink: string, hcloudOriginalEmail: string) {
        super(recipients, MailjetTemplate.IDP_NEW_REGISTRATION, {
            HCLOUD_VERIFY_LINK: verifyLink,
            HCLOUD_ORIGINAL_EMAIL: hcloudOriginalEmail,
        });
    }
}

export class IdpNewRegistrationMailjetMailToCustomerDTO extends MailjetMailDTO {
    constructor(recipients: string[], email: string) {
        super(recipients, MailjetTemplate.IDP_NEW_REGISTRATION_CUSTOMER, {
            EMAIL_TO: email,
        });
    }
}

export class IdpResetPasswordMailjetMailDTO extends MailjetMailDTO {
    constructor(recipients: string[], resetPasswordLink: string) {
        super(recipients, MailjetTemplate.IDP_RESET_PASSWORD, {
            HCLOUD_RESET_PASSWORD_LINK: resetPasswordLink,
        });
    }
}

export class IdpInviteToOrganizationMailjetMailDto extends MailjetMailDTO {
    constructor(recipients: string[], approvalLink: string, inviteFromPerson: string, inviteToOrganization: string) {
        super(recipients, MailjetTemplate.IDP_INVITE_TO_ORGANIZATION, {
            HCLOUD_INVITE_FROM: inviteFromPerson,
            HCLOUD_INVITE_ORGANIZATION: inviteToOrganization,
            HCLOUD_APPROVAL_LINK: approvalLink,
        });
    }
}

export class IdpRegisterAndInviteToOrganizationMailjetMailDto extends MailjetMailDTO {
    constructor(recipients: string[], registerLink: string, inviteFromPerson: string, inviteToOrganization: string) {
        super(recipients, MailjetTemplate.IDP_REGISTRATION_AND_INVITATION, {
            HCLOUD_INVITE_FROM: inviteFromPerson,
            HCLOUD_INVITE_ORGANIZATION: inviteToOrganization,
            HCLOUD_REGISTER_LINK: registerLink,
        });
    }
}

export class IdpUserLeftOrganizationMailjetMailDTO extends MailjetMailDTO {
    constructor(recipients: string[], userName: string, userEmail: string, organizationName: string) {
        super(recipients, MailjetTemplate.IDP_USER_LEFT_ORGANIZATION, {
            USER_NAME: userName,
            USER_EMAIL: userEmail,
            ORGANIZATION_NAME: organizationName,
        });
    }
}
