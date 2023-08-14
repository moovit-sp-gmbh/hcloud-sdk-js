import { Msg } from "nats";
import { Products } from "./Global";

enum NatsSubject {
    IDP_USER_GENERAL = "hcloud.idp.user.${userId}.general",
    IDP_USER_MESSAGES = "hcloud.idp.user.${userId}.messages",
    IDP_USER_SETTINGS_PATS = "hcloud.idp.user.${userId}.settings.pats",
    IDP_USER_SETTINGS_OAUTH = "hcloud.idp.user.${userId}.settings.oauth",

    IDP_ORGANIZATION_GENERAL = "hcloud.idp.organization.${organizationId}.general",
    IDP_ORGANIZATION_MEMBERS = "hcloud.idp.organization.${organizationId}.members",
    IDP_ORGANIZATION_TEAMS = "hcloud.idp.organization.${organizationId}.teams",

    HIGH5_SPACES = "hcloud.high5.organization.${organizationId}.spaces",
    HIGH5_STREAM_EXECUTE = "hcloud.high5.organization.${organizationId}.stream.execute.${base64email}",
    HIGH5_EVENTS = "hcloud.high5.organization.${organizationId}.space.${spaceId}.events",
    HIGH5_STREAMS = "hcloud.high5.organization.${organizationId}.space.${spaceId}.event.${eventId}.streams",
    HIGH5_SETTINGS_GENERAL = "hcloud.high5.organization.${organizationId}.space.${spaceId}.settings.general",
    HIGH5_SETTINGS_WEBHOOKS = "hcloud.high5.organization.${organizationId}.space.${spaceId}.settings.webhooks",
    HIGH5_SETTINGS_SECRETS = "hcloud.high5.organization.${organizationId}.space.${spaceId}.settings.secrets",

    FUSE_JOBS = "hcloud.fuse.jobs",
    FUSE_JOBS_TRIGGER = "hcloud.fuse.jobs.trigger",

    DEBUG_NAMESPACE = "hcloud.debug.namespace.${product}",
}

type NatsSubjectReplacements = {
    userId?: string;
    organizationId?: string;
    spaceId?: string;
    eventId?: string;
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
}

enum NatsObjectType {
    DEBUG = "DEBUG",

    USER = "USER",
    OAUTH = "OAUTH",
    ORGANIZATION = "ORGANIZATION",
    ORGANIZATION_MEMBER = "ORGANIZATION_MEMBER",
    PAT = "PAT",
    TEAM = "TEAM",

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
            };
        };
        static Organization = class {
            static GENERAL = (organizationId: string) => {
                return NatsSubjects.replace(NatsSubject.IDP_ORGANIZATION_GENERAL, { organizationId } as NatsSubjectReplacements);
            };
            static MEMBERS = (organizationId: string) => {
                return NatsSubjects.replace(NatsSubject.IDP_ORGANIZATION_MEMBERS, { organizationId } as NatsSubjectReplacements);
            };
            static TEAMS = (organizationId: string) => {
                return NatsSubjects.replace(NatsSubject.IDP_ORGANIZATION_TEAMS, { organizationId } as NatsSubjectReplacements);
            };
        };
    };

    static Fuse = class {
        static JOBS = () => {
            return NatsSubject.FUSE_JOBS.toString();
        };
    };

    static High5 = class {
        static EXECUTE = (organizationId: string, base64email: string) => {
            return NatsSubjects.replace(NatsSubject.HIGH5_STREAM_EXECUTE, { organizationId, base64email } as NatsSubjectReplacements);
        };

        static SPACES = (organizationId: string) => {
            return NatsSubjects.replace(NatsSubject.HIGH5_SPACES, { organizationId } as NatsSubjectReplacements);
        };

        static Space = class {
            static EVENTS = (organizationId: string, spaceId: string) => {
                return NatsSubjects.replace(NatsSubject.HIGH5_EVENTS, { organizationId, spaceId } as NatsSubjectReplacements);
            };

            static Event = class {
                static STREAMS = (organizationId: string, spaceId: string, eventId: string) => {
                    return NatsSubjects.replace(NatsSubject.HIGH5_STREAMS, { organizationId, spaceId, eventId } as NatsSubjectReplacements);
                };
            };

            static Settings = class {
                static GENERAL = (organizationId: string, spaceId: string) => {
                    return NatsSubjects.replace(NatsSubject.HIGH5_SETTINGS_GENERAL, { organizationId, spaceId } as NatsSubjectReplacements);
                };
                static WEBHOOKS = (organizationId: string, spaceId: string) => {
                    return NatsSubjects.replace(NatsSubject.HIGH5_SETTINGS_WEBHOOKS, { organizationId, spaceId } as NatsSubjectReplacements);
                };
                static SECRETS = (organizationId: string, spaceId: string) => {
                    return NatsSubjects.replace(NatsSubject.HIGH5_SETTINGS_SECRETS, { organizationId, spaceId } as NatsSubjectReplacements);
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
        subject = subject.replace("${organizationId}", replacements.organizationId || "null");
        subject = subject.replace("${spaceId}", replacements.spaceId || "null");
        subject = subject.replace("${eventId}", replacements.eventId || "null");
        subject = subject.replace("${streamId}", replacements.streamId || "null");
        subject = subject.replace("${designId}", replacements.designId || "null");
        subject = subject.replace("${nodeId}", replacements.nodeId || "null");
        subject = subject.replace("${product}", replacements.product || "null");
        subject = subject.replace("${base64email}", replacements.base64email || "null");

        return subject;
    };
}

export { NatsSubjects, NatsMessageType, NatsObjectType, NatsMessage, NatsCallback, Msg as RawMsg };
