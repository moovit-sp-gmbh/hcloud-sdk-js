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

    COSMO_NEW_SHARE = "COSMO_NEW_SHARE",
    COSMO_USER_ADDED_TO_SPACE = "COSMO_USER_ADDED_TO_SPACE",
    COSMO_USER_REMOVED_FROM_SPACE = "COSMO_USER_REMOVED_FROM_SPACE",
    COSMO_COMMENT_ADDED = "COSMO_COMMENT_ADDED",
    COSMO_REPLIED_TO_COMMENT = "COSMO_REPLIED_TO_COMMENT",
    COSMO_ASSET_STATUS_CHANGED = "COSMO_ASSET_STATUS_CHANGED",
    COSMO_ASSET_UPLOADED_TO_SHARE = "COSMO_ASSET_UPLOADED_TO_SHARE",
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
    constructor(recipients: string[], username: string) {
        super(recipients, MailjetTemplate.IDP_NEW_REGISTRATION_CUSTOMER, {
            USERNAME: username,
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

export class CosmoNewShareMailjetMailDTO extends MailjetMailDTO {
    constructor(recipients: string[], shareLink: string) {
        super(recipients, MailjetTemplate.COSMO_NEW_SHARE, {
            HCLOUD_SHARE_LINK: shareLink,
        });
    }
}

export class CosmoUserAddedToSpaceMailjetMailDTO extends MailjetMailDTO {
    constructor(recipients: string[], actorName: string, recipientName: string, spaceName: string, link: string) {
        super(recipients, MailjetTemplate.COSMO_USER_ADDED_TO_SPACE, {
            ACTOR_NAME: actorName,
            RECIPIENT_NAME: recipientName,
            SPACE_NAME: spaceName,
            LINK: link,
        });
    }
}

export class CosmoCommentOrAnnotationAddedMailjetMailDTO extends MailjetMailDTO {
    constructor(
        recipients: string[],
        assetName: string,
        recipientName: string,
        actorName: string,
        commentSnippet: string,
        spaceName: string,
        link: string
    ) {
        super(recipients, MailjetTemplate.COSMO_COMMENT_ADDED, {
            ASSET_NAME: assetName,
            RECIPIENT_NAME: recipientName,
            ACTOR_NAME: actorName,
            COMMENT_SNIPPET: commentSnippet,
            SPACE_NAME: spaceName,
            LINK: link,
        });
    }
}

export class CosmoRepliedToCommentMailjetMailDTO extends MailjetMailDTO {
    constructor(
        recipients: string[],
        assetName: string,
        recipientName: string,
        actorName: string,
        commentSnippet: string,
        spaceName: string,
        link: string
    ) {
        super(recipients, MailjetTemplate.COSMO_REPLIED_TO_COMMENT, {
            ASSET_NAME: assetName,
            RECIPIENT_NAME: recipientName,
            ACTOR_NAME: actorName,
            COMMENT_SNIPPET: commentSnippet,
            SPACE_NAME: spaceName,
            LINK: link,
        });
    }
}

export class CosmoAssetStatusChangedMailjetMailDTO extends MailjetMailDTO {
    constructor(
        recipients: string[],
        assetName: string,
        recipientName: string,
        actorName: string,
        newStatus: string,
        spaceName: string,
        link: string
    ) {
        super(recipients, MailjetTemplate.COSMO_ASSET_STATUS_CHANGED, {
            ASSET_NAME: assetName,
            RECIPIENT_NAME: recipientName,
            ACTOR_NAME: actorName,
            NEW_STATUS: newStatus,
            SPACE_NAME: spaceName,
            LINK: link,
        });
    }
}
