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

export enum MailTemplate {
    IDP_NEW_REGISTRATION = "IDP_NEW_REGISTRATION",
    IDP_NEW_REGISTRATION_CUSTOMER = "IDP_NEW_REGISTRATION_CUSTOMER",
    IDP_NEW_CLOSED_REGISTRATION = "IDP_NEW_CLOSED_REGISTRATION",
    IDP_INVITE_TO_ORGANIZATION = "IDP_INVITE_TO_ORGANIZATION",
    IDP_RESET_PASSWORD = "IDP_RESET_PASSWORD",
    IDP_REGISTRATION_AND_INVITATION = "IDP_REGISTRATION_AND_INVITATION",
    IDP_USER_LEFT_ORGANIZATION = "IDP_USER_LEFT_ORGANIZATION",
    IDP_ACCOUNT_APPROVED = "IDP_ACCOUNT_APPROVED",

    COSMO_NEW_SHARE = "COSMO_NEW_SHARE",
    COSMO_USER_ADDED_TO_SPACE = "COSMO_USER_ADDED_TO_SPACE",
    COSMO_USER_REMOVED_FROM_SPACE = "COSMO_USER_REMOVED_FROM_SPACE",
    COSMO_COMMENT_ADDED = "COSMO_COMMENT_ADDED",
    COSMO_COMMENT_MENTION = "COSMO_COMMENT_MENTION",
    COSMO_REPLIED_TO_COMMENT = "COSMO_REPLIED_TO_COMMENT",
    COSMO_ASSET_STATUS_CHANGED = "COSMO_ASSET_STATUS_CHANGED",
    COSMO_ASSET_UPLOADED_TO_SHARE = "COSMO_ASSET_UPLOADED_TO_SHARE",
    COSMO_SHARE_PASSWORD_CHANGED = "COSMO_SHARE_PASSWORD_CHANGED",
}

interface MailTemplateField {
    [key: string]: string;
}

export type MailjetResponse = {
    Messages: [
        {
            Status: string;
            To: [
                {
                    Email: string;
                    MessageUUID: string;
                    MessageID: string | number;
                    MessageHref: string;
                },
            ];
        },
    ];
};

export interface ResendResponse {
    emailId: string;
}

export abstract class MailDTO {
    public recipients: string[];
    public template: MailTemplate;
    public fields: MailTemplateField;

    constructor(recipients: string[], template: MailTemplate, fields: MailTemplateField) {
        this.recipients = recipients;
        this.template = template;
        this.fields = fields;
    }
}

// Mailjet templates
export class IdpNewRegistrationMailjetMailDTO extends MailDTO {
    constructor(recipients: string[], verifyLink: string, hcloudOriginalEmail: string, name: string, company: string) {
        super(recipients, MailTemplate.IDP_NEW_REGISTRATION, {
            HCLOUD_VERIFY_LINK: verifyLink,
            HCLOUD_ORIGINAL_EMAIL: hcloudOriginalEmail,
            HCLOUD_NAME: name,
            HCLOUD_COMPANY: company,
        });
    }
}

export class IdpNewRegistrationMailjetMailToCustomerDTO extends MailDTO {
    constructor(recipients: string[], username: string) {
        super(recipients, MailTemplate.IDP_NEW_REGISTRATION_CUSTOMER, {
            USERNAME: username,
        });
    }
}

export class IdpResetPasswordMailjetMailDTO extends MailDTO {
    constructor(recipients: string[], resetPasswordLink: string) {
        super(recipients, MailTemplate.IDP_RESET_PASSWORD, {
            HCLOUD_RESET_PASSWORD_LINK: resetPasswordLink,
        });
    }
}

export class IdpInviteToOrganizationMailjetMailDto extends MailDTO {
    constructor(recipients: string[], approvalLink: string, inviteFromPerson: string, inviteToOrganization: string) {
        super(recipients, MailTemplate.IDP_INVITE_TO_ORGANIZATION, {
            HCLOUD_INVITE_FROM: inviteFromPerson,
            HCLOUD_INVITE_ORGANIZATION: inviteToOrganization,
            HCLOUD_APPROVAL_LINK: approvalLink,
        });
    }
}

export class IdpRegisterAndInviteToOrganizationMailjetMailDto extends MailDTO {
    constructor(recipients: string[], registerLink: string, inviteFromPerson: string, inviteToOrganization: string) {
        super(recipients, MailTemplate.IDP_REGISTRATION_AND_INVITATION, {
            HCLOUD_INVITE_FROM: inviteFromPerson,
            HCLOUD_INVITE_ORGANIZATION: inviteToOrganization,
            HCLOUD_REGISTER_LINK: registerLink,
        });
    }
}

export class IdpUserLeftOrganizationMailjetMailDTO extends MailDTO {
    constructor(recipients: string[], userName: string, userEmail: string, organizationName: string) {
        super(recipients, MailTemplate.IDP_USER_LEFT_ORGANIZATION, {
            USER_NAME: userName,
            USER_EMAIL: userEmail,
            ORGANIZATION_NAME: organizationName,
        });
    }
}

export class IdpAccountApprovedMailjetMailDTO extends MailDTO {
    constructor(recipients: string[], username: string, signInLink: string) {
        super(recipients, MailTemplate.IDP_ACCOUNT_APPROVED, {
            USERNAME: username,
            HCLOUD_SIGN_IN_LINK: signInLink,
        });
    }
}

export class CosmoNewShareMailjetMailDTO extends MailDTO {
    constructor(recipients: string[], shareLink: string, shareMessage: string) {
        super(recipients, MailTemplate.COSMO_NEW_SHARE, {
            HCLOUD_SHARE_LINK: shareLink,
            HCLOUD_SHARE_MESSAGE: shareMessage,
        });
    }
}

export class CosmoUserAddedToSpaceMailjetMailDTO extends MailDTO {
    constructor(recipients: string[], actorName: string, recipientName: string, spaceName: string, link: string) {
        super(recipients, MailTemplate.COSMO_USER_ADDED_TO_SPACE, {
            ACTOR_NAME: actorName,
            RECIPIENT_NAME: recipientName,
            SPACE_NAME: spaceName,
            LINK: link,
        });
    }
}

export class CosmoUserRemovedFromSpaceMailjetMailDTO extends MailDTO {
    constructor(recipients: string[], actorName: string, recipientName: string, spaceName: string) {
        super(recipients, MailTemplate.COSMO_USER_REMOVED_FROM_SPACE, {
            ACTOR_NAME: actorName,
            RECIPIENT_NAME: recipientName,
            SPACE_NAME: spaceName,
        });
    }
}

export class CosmoCommentOrAnnotationAddedMailjetMailDTO extends MailDTO {
    constructor(
        recipients: string[],
        assetName: string,
        recipientName: string,
        actorName: string,
        commentSnippet: string,
        spaceName: string,
        link: string
    ) {
        super(recipients, MailTemplate.COSMO_COMMENT_ADDED, {
            ASSET_NAME: assetName,
            RECIPIENT_NAME: recipientName,
            ACTOR_NAME: actorName,
            COMMENT_SNIPPET: commentSnippet,
            SPACE_NAME: spaceName,
            LINK: link,
        });
    }
}

export class CosmoCommentMentionMailjetMailDTO extends MailDTO {
    constructor(
        recipients: string[],
        assetName: string,
        recipientName: string,
        actorName: string,
        commentSnippet: string,
        spaceName: string,
        link: string
    ) {
        super(recipients, MailTemplate.COSMO_COMMENT_MENTION, {
            ASSET_NAME: assetName,
            RECIPIENT_NAME: recipientName,
            ACTOR_NAME: actorName,
            COMMENT_SNIPPET: commentSnippet,
            SPACE_NAME: spaceName,
            LINK: link,
        });
    }
}

export class CosmoRepliedToCommentMailjetMailDTO extends MailDTO {
    constructor(
        recipients: string[],
        assetName: string,
        recipientName: string,
        actorName: string,
        commentSnippet: string,
        spaceName: string,
        link: string
    ) {
        super(recipients, MailTemplate.COSMO_REPLIED_TO_COMMENT, {
            ASSET_NAME: assetName,
            RECIPIENT_NAME: recipientName,
            ACTOR_NAME: actorName,
            COMMENT_SNIPPET: commentSnippet,
            SPACE_NAME: spaceName,
            LINK: link,
        });
    }
}

export class CosmoAssetStatusChangedMailjetMailDTO extends MailDTO {
    constructor(
        recipients: string[],
        assetName: string,
        recipientName: string,
        actorName: string,
        newStatus: string,
        spaceName: string,
        link: string
    ) {
        super(recipients, MailTemplate.COSMO_ASSET_STATUS_CHANGED, {
            ASSET_NAME: assetName,
            RECIPIENT_NAME: recipientName,
            ACTOR_NAME: actorName,
            NEW_STATUS: newStatus,
            SPACE_NAME: spaceName,
            LINK: link,
        });
    }
}

export class CosmoSharePasswordChangedMailjetMailDTO extends MailDTO {
    constructor(recipients: string[], recipientName: string, shareName: string, shareLink: string) {
        super(recipients, MailTemplate.COSMO_SHARE_PASSWORD_CHANGED, {
            RECIPIENT_NAME: recipientName,
            SHARE_NAME: shareName,
            HCLOUD_SHARE_LINK: shareLink,
        });
    }
}

// Resend templates

export class IdpNewRegistrationResendMailDTO extends MailDTO {
    constructor(recipients: string[], name: string, email: string, company: string, link: string) {
        super(recipients, MailTemplate.IDP_NEW_REGISTRATION, {
            NAME: name,
            EMAIL: email,
            COMPANY: company,
            LINK: link,
        });
    }
}

export class IdpNewRegistrationResendMailToCustomerDTO extends MailDTO {
    constructor(recipients: string[], username: string) {
        super(recipients, MailTemplate.IDP_NEW_REGISTRATION_CUSTOMER, {
            USERNAME: username,
        });
    }
}

export class IdpNewClosedRegistrationResendMailDTO extends MailDTO {
    constructor(recipients: string[], name: string, email: string) {
        super(recipients, MailTemplate.IDP_NEW_CLOSED_REGISTRATION, {
            NAME: name,
            EMAIL: email,
        });
    }
}

export class IdpResetPasswordResendMailDTO extends MailDTO {
    constructor(recipients: string[], email: string, resetPasswordLink: string) {
        super(recipients, MailTemplate.IDP_RESET_PASSWORD, {
            EMAIL: email,
            LINK: resetPasswordLink,
        });
    }
}

export class IdpInviteToOrganizationResendMailDto extends MailDTO {
    constructor(recipients: string[], name: string, email: string, inviteFromPerson: string, inviteToOrganization: string, link: string) {
        super(recipients, MailTemplate.IDP_INVITE_TO_ORGANIZATION, {
            NAME: name,
            EMAIL: email,
            HCLOUD_INVITE_FROM: inviteFromPerson,
            HCLOUD_INVITE_ORGANIZATION: inviteToOrganization,
            LINK: link,
        });
    }
}

export class IdpRegisterAndInviteToOrganizationResendMailDto extends MailDTO {
    constructor(recipients: string[], email: string, inviteFromPerson: string, inviteToOrganization: string, link: string) {
        super(recipients, MailTemplate.IDP_REGISTRATION_AND_INVITATION, {
            EMAIL: email,
            INVITE_FROM: inviteFromPerson,
            INVITE_ORGANIZATION: inviteToOrganization,
            LINK: link,
        });
    }
}

export class IdpUserLeftOrganizationResendMailDTO extends MailDTO {
    constructor(recipients: string[], name: string, email: string, organizationName: string) {
        super(recipients, MailTemplate.IDP_USER_LEFT_ORGANIZATION, {
            NAME: name,
            EMAIL: email,
            HCLOUD_ORGANIZATION_NAME: organizationName,
        });
    }
}

export class IdpAccountApprovedResendMailDTO extends MailDTO {
    constructor(recipients: string[], username: string, signInLink: string) {
        super(recipients, MailTemplate.IDP_ACCOUNT_APPROVED, {
            USERNAME: username,
            HCLOUD_SIGN_IN_LINK: signInLink,
        });
    }
}

export class CosmoNewShareResendMailDTO extends MailDTO {
    constructor(recipients: string[], recipientEmail: string, shareLink: string, shareMessage: string) {
        super(recipients, MailTemplate.COSMO_NEW_SHARE, {
            RECIPIENT_EMAIL: recipientEmail,
            LINK: shareLink,
            HCLOUD_SHARE_MESSAGE: shareMessage,
        });
    }
}

export class CosmoUserAddedToSpaceResendMailDTO extends MailDTO {
    constructor(recipients: string[], actorName: string, recipientName: string, recipientEmail: string, spaceName: string, link: string) {
        super(recipients, MailTemplate.COSMO_USER_ADDED_TO_SPACE, {
            ACTOR_NAME: actorName,
            RECIPIENT_NAME: recipientName,
            RECIPIENT_EMAIL: recipientEmail,
            SPACE_NAME: spaceName,
            LINK: link,
        });
    }
}

export class CosmoUserRemovedFromSpaceResendMailDTO extends MailDTO {
    constructor(recipients: string[], actorName: string, recipientName: string, recipientEmail: string, spaceName: string) {
        super(recipients, MailTemplate.COSMO_USER_REMOVED_FROM_SPACE, {
            ACTOR_NAME: actorName,
            RECIPIENT_NAME: recipientName,
            RECIPIENT_EMAIL: recipientEmail,
            SPACE_NAME: spaceName,
        });
    }
}

export class CosmoCommentOrAnnotationAddedResendMailDTO extends MailDTO {
    constructor(
        recipients: string[],
        assetName: string,
        recipientName: string,
        recipientEmail: string,
        actorName: string,
        commentSnippet: string,
        spaceName: string,
        link: string
    ) {
        super(recipients, MailTemplate.COSMO_COMMENT_ADDED, {
            ASSET_NAME: assetName,
            RECIPIENT_NAME: recipientName,
            RECIPIENT_EMAIL: recipientEmail,
            ACTOR_NAME: actorName,
            COMMENT_SNIPPET: commentSnippet,
            SPACE_NAME: spaceName,
            LINK: link,
        });
    }
}

export class CosmoCommentMentionResendMailDTO extends MailDTO {
    constructor(
        recipients: string[],
        assetName: string,
        recipientName: string,
        recipientEmail: string,
        actorName: string,
        commentSnippet: string,
        spaceName: string,
        link: string
    ) {
        super(recipients, MailTemplate.COSMO_COMMENT_MENTION, {
            ASSET_NAME: assetName,
            RECIPIENT_NAME: recipientName,
            RECIPIENT_EMAIL: recipientEmail,
            ACTOR_NAME: actorName,
            COMMENT_SNIPPET: commentSnippet,
            SPACE_NAME: spaceName,
            LINK: link,
        });
    }
}

export class CosmoRepliedToCommentResendMailDTO extends MailDTO {
    constructor(
        recipients: string[],
        assetName: string,
        recipientName: string,
        recipientEmail: string,
        actorName: string,
        commentSnippet: string,
        spaceName: string,
        link: string
    ) {
        super(recipients, MailTemplate.COSMO_REPLIED_TO_COMMENT, {
            ASSET_NAME: assetName,
            RECIPIENT_NAME: recipientName,
            RECIPIENT_EMAIL: recipientEmail,
            ACTOR_NAME: actorName,
            COMMENT_SNIPPET: commentSnippet,
            SPACE_NAME: spaceName,
            LINK: link,
        });
    }
}

export class CosmoAssetStatusChangedResendMailDTO extends MailDTO {
    constructor(
        recipients: string[],
        assetName: string,
        recipientName: string,
        recipientEmail: string,
        actorName: string,
        newStatus: string,
        spaceName: string,
        link: string
    ) {
        super(recipients, MailTemplate.COSMO_ASSET_STATUS_CHANGED, {
            ASSET_NAME: assetName,
            RECIPIENT_NAME: recipientName,
            RECIPIENT_EMAIL: recipientEmail,
            ACTOR_NAME: actorName,
            NEW_STATUS: newStatus,
            SPACE_NAME: spaceName,
            LINK: link,
        });
    }
}

export class CosmoSharePasswordChangedResendMailDTO extends MailDTO {
    constructor(recipients: string[], recipientName: string, recipientEmail: string, shareName: string, shareLink: string) {
        super(recipients, MailTemplate.COSMO_SHARE_PASSWORD_CHANGED, {
            RECIPIENT_NAME: recipientName,
            RECIPIENT_EMAIL: recipientEmail,
            SHARE_NAME: shareName,
            LINK: shareLink,
        });
    }
}
