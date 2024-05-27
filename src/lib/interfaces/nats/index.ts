import { Msg } from "nats";
import { Products } from "../global";

enum NatsSubject {
    IDP_USER_GENERAL = "hcloud.idp.user.${userId}.general",
    IDP_USER_MESSAGES = "hcloud.idp.user.${userId}.messages",
    IDP_USER_SETTINGS_PATS = "hcloud.idp.user.${userId}.settings.pats",
    IDP_USER_SETTINGS_OAUTH = "hcloud.idp.user.${userId}.settings.oauth",
    IDP_USER_SETTINGS_NOTIFICATIONS = "hcloud.idp.user.${userId}.settings.notifications",

    IDP_ORGANIZATION_GENERAL = "hcloud.idp.organization.${organizationName}.general",
    IDP_ORGANIZATION_MEMBERS = "hcloud.idp.organization.${organizationName}.members",
    IDP_ORGANIZATION_MEMBERS_EXECUTION_TARGET = "hcloud.idp.organization.${organizationName}.members.${base64email}.executionTarget",
    IDP_ORGANIZATION_TEAMS = "hcloud.idp.organization.${organizationName}.teams",

    HIGH5_SPACES = "hcloud.high5.organization.${organizationName}.spaces",
    HIGH5_STREAM_EXECUTE = "hcloud.high5.organization.${organizationName}.stream.execute.${base64email}",
    HIGH5_STREAM_CANCEL = "hcloud.high5.organization.${organizationName}.stream.execute.${base64email}",
    HIGH5_EVENTS = "hcloud.high5.organization.${organizationName}.space.${spaceName}.events",
    HIGH5_STREAMS = "hcloud.high5.organization.${organizationName}.space.${spaceName}.event.${eventName}.streams",
    HIGH5_SECRETS = "hcloud.high5.organization.${organizationName}.space.${spaceName}.secrets",
    HIGH5_SETTINGS_GENERAL = "hcloud.high5.organization.${organizationName}.space.${spaceName}.settings.general",
    HIGH5_SETTINGS_WEBHOOKS = "hcloud.high5.organization.${organizationName}.space.${spaceName}.settings.webhooks",

    FUSE_JOBS = "hcloud.fuse.jobs",
    FUSE_JOBS_TRIGGER = "hcloud.fuse.jobs.trigger",

    DEBUG_NAMESPACE = "hcloud.debug.namespace.${product}",
}

type NatsSubjectReplacements = {
    userId?: string;
    organizationName?: string;
    spaceName?: string;
    eventName?: string;
    streamId?: string;
    designId?: string;
    nodeId?: string;
    product?: Products;
    base64email?: string;
};

enum NatsMessageType {
    ADD = "ADD",
    UPDATE = "UPDATE",
    DELETE = "DELETE",
    EXECUTE = "EXECUTE",
    CANCEL = "CANCEL",
}

enum NatsObjectType {
    DEBUG = "DEBUG",

    USER = "USER",
    OAUTH = "OAUTH",
    ORGANIZATION = "ORGANIZATION",
    ORGANIZATION_MEMBER = "ORGANIZATION_MEMBER",
    PAT = "PAT",
    TEAM = "TEAM",
    NOTIFICATIONS = "NOTIFICATIONS",

    SPACE = "SPACE",
    DESIGN = "DESIGN",
    EVENT = "EVENT",
    EXECUTION = "EXECUTION",
    NODE = "NODE",
    STREAM = "STREAM",
    WEBHOOK = "WEBHOOK",
    WEBHOOK_LOG = "WEBHOOK_LOG",
    SECRET = "SECRET",

    AUDIT_LOG = "AUDIT_LOG",
    MAIL = "MAIL",

    CRONJOB = "CRONJOB",
    CRONJOB_ID = "CRONJOB_ID",
}

interface NatsMessage {
    type: NatsMessageType;
    object: unknown;
    objectType: NatsObjectType;
}

type NatsCallback = (msg: NatsMessage, rawMsg: Msg) => void;

/**
 * NatsSubjects creates subject strings to be used with nats.subscribe and nats.publish
 */
class NatsSubjects {
    static IDP = class {
        static User = class {
            static GENERAL = (userId: string) => {
                return NatsSubjects.replace(NatsSubject.IDP_USER_GENERAL, { userId } as NatsSubjectReplacements);
            };
            static MESSAGES = (userId: string) => {
                return NatsSubjects.replace(NatsSubject.IDP_USER_MESSAGES, { userId } as NatsSubjectReplacements);
            };

            static Settings = class {
                static PATS = (userId: string) => {
                    return NatsSubjects.replace(NatsSubject.IDP_USER_SETTINGS_PATS, { userId } as NatsSubjectReplacements);
                };
                static OAUTH = (userId: string) => {
                    return NatsSubjects.replace(NatsSubject.IDP_USER_SETTINGS_OAUTH, { userId } as NatsSubjectReplacements);
                };
                static NOTIFICATIONS = (userId: string) => {
                    return NatsSubjects.replace(NatsSubject.IDP_USER_SETTINGS_NOTIFICATIONS, { userId } as NatsSubjectReplacements);
                };
            };
        };
        static Organization = class {
            static GENERAL = (organizationName: string) => {
                return NatsSubjects.replace(NatsSubject.IDP_ORGANIZATION_GENERAL, { organizationName } as NatsSubjectReplacements);
            };
            static MEMBERS = (organizationName: string): string & { EXECUTION_TARGET: (email: string) => string } => {
                return Object.defineProperty(
                    Object(NatsSubjects.replace(NatsSubject.IDP_ORGANIZATION_MEMBERS, { organizationName } as NatsSubjectReplacements)),
                    "EXECUTION_TARGET",
                    {
                        value: function (memberEmail: string) {
                            return NatsSubjects.replace(NatsSubject.IDP_ORGANIZATION_MEMBERS_EXECUTION_TARGET, {
                                organizationName,
                                base64email: memberEmail,
                            } as NatsSubjectReplacements);
                        },
                        writable: false,
                        enumerable: false,
                        configurable: true,
                    }
                ) as string & { EXECUTION_TARGET: (email: string) => string };
            };
            static TEAMS = (organizationName: string) => {
                return NatsSubjects.replace(NatsSubject.IDP_ORGANIZATION_TEAMS, { organizationName } as NatsSubjectReplacements);
            };
        };
    };

    static Fuse = class {
        static JOBS = () => {
            return NatsSubject.FUSE_JOBS.toString();
        };
    };

    static High5 = class {
        static Execution = class {
            static EXECUTE = (organizationName: string, base64email: string) => {
                return NatsSubjects.replace(NatsSubject.HIGH5_STREAM_EXECUTE, { organizationName, base64email } as NatsSubjectReplacements);
            };

            static CANCEL = (organizationName: string, base64email: string) => {
                return NatsSubjects.replace(NatsSubject.HIGH5_STREAM_CANCEL, { organizationName, base64email } as NatsSubjectReplacements);
            };
        };

        static SPACES = (organizationName: string) => {
            return NatsSubjects.replace(NatsSubject.HIGH5_SPACES, { organizationName } as NatsSubjectReplacements);
        };

        static Space = class {
            static EVENTS = (organizationName: string, spaceName: string) => {
                return NatsSubjects.replace(NatsSubject.HIGH5_EVENTS, { organizationName, spaceName } as NatsSubjectReplacements);
            };

            static Event = class {
                static STREAMS = (organizationName: string, spaceName: string, eventName: string) => {
                    return NatsSubjects.replace(NatsSubject.HIGH5_STREAMS, { organizationName, spaceName, eventName } as NatsSubjectReplacements);
                };
            };

            static SECRETS = (organizationName: string, spaceName: string) => {
                return NatsSubjects.replace(NatsSubject.HIGH5_SECRETS, { organizationName, spaceName } as NatsSubjectReplacements);
            };

            static Settings = class {
                static GENERAL = (organizationName: string, spaceName: string) => {
                    return NatsSubjects.replace(NatsSubject.HIGH5_SETTINGS_GENERAL, { organizationName, spaceName } as NatsSubjectReplacements);
                };
                static WEBHOOKS = (organizationName: string, spaceName: string) => {
                    return NatsSubjects.replace(NatsSubject.HIGH5_SETTINGS_WEBHOOKS, { organizationName, spaceName } as NatsSubjectReplacements);
                };
            };
        };
    };

    static Logging = (product: Products) => {
        return NatsSubjects.replace(NatsSubject.DEBUG_NAMESPACE, { product } as NatsSubjectReplacements);
    };

    // eslint-disable-next-line complexity
    private static replace = (subject: string, replacements: NatsSubjectReplacements): string => {
        subject = subject.replace("${userId}", replacements.userId || "null");
        subject = subject.replace("${organizationName}", replacements.organizationName || "null");
        subject = subject.replace("${spaceName}", replacements.spaceName || "null");
        subject = subject.replace("${eventName}", replacements.eventName || "null");
        subject = subject.replace("${streamId}", replacements.streamId || "null");
        subject = subject.replace("${designId}", replacements.designId || "null");
        subject = subject.replace("${nodeId}", replacements.nodeId || "null");
        subject = subject.replace("${product}", replacements.product || "null");
        subject = subject.replace("${base64email}", replacements.base64email || "null");

        return subject;
    };
}

export { NatsSubjects, NatsMessageType, NatsObjectType, NatsMessage, NatsCallback, Msg as RawMsg };
