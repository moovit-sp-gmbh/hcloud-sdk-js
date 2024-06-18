import { Msg } from "nats";
import { Products } from "../global";
import { High5ExecuteOnAgentRequest, High5ExecutionCancelRequest } from "../high5/space/execution";

enum NatsSubject {
    IDP_USER_GENERAL = "hcloud.idp.user.${userId}.general",
    IDP_USER_MESSAGES = "hcloud.idp.user.${userId}.messages",
    IDP_USER_SETTINGS_PATS = "hcloud.idp.user.${userId}.settings.pats",
    IDP_USER_SETTINGS_OAUTH = "hcloud.idp.user.${userId}.settings.oauth",
    IDP_USER_SETTINGS_NOTIFICATIONS = "hcloud.idp.user.${userId}.settings.notifications",
    IDP_USER_GENERAL_SETTINGS = "hcloud.idp.user.${userId}.settings.general_settings",

    IDP_ORGANIZATION_GENERAL = "hcloud.idp.organization.${organizationName}.general",
    IDP_ORGANIZATION_MEMBERS = "hcloud.idp.organization.${organizationName}.members",
    IDP_ORGANIZATION_MEMBERS_EXECUTION_TARGET = "hcloud.idp.organization.${organizationName}.members.${base64email}.executionTarget",
    IDP_ORGANIZATION_TEAMS = "hcloud.idp.organization.${organizationName}.teams",

    HIGH5_SPACES = "hcloud.high5.organization.${organizationName}.spaces",
    HIGH5_STREAM_EXECUTE = "hcloud.high5.organization.${organizationId}.stream.execute.${base64email}",
    HIGH5_STREAM_CANCEL = "hcloud.high5.organization.${organizationId}.stream.execute.${base64email}",
    HIGH5_EVENTS = "hcloud.high5.organization.${organizationName}.space.${spaceName}.events",
    HIGH5_STREAMS = "hcloud.high5.organization.${organizationName}.space.${spaceName}.event.${eventName}.streams",
    HIGH5_SECRETS = "hcloud.high5.organization.${organizationName}.space.${spaceName}.secrets",
    HIGH5_SETTINGS_GENERAL = "hcloud.high5.organization.${organizationName}.space.${spaceName}.settings.general",
    HIGH5_SETTINGS_WEBHOOKS = "hcloud.high5.organization.${organizationName}.space.${spaceName}.settings.webhooks",

    FUSE_SPACES = "hcloud.fuse.organization.${organizationName}.spaces",
    FUSE_JOBS = "hcloud.fuse.organization.${organizationName}.space.${spaceName}.jobs",
    FUSE_JOB_LOGS = "hcloud.fuse.organization.${organizationName}.space.${spaceName}.jobs.logs",
    FUSE_JOBS_TRIGGER = "hcloud.hcloud.fuse.organization.${organizationName}.space.${spaceName}.jobs.trigger",

    DEBUG_NAMESPACE = "hcloud.debug.namespace.${product}",
}

type NatsSubjectReplacements = {
    userId?: string;
    organizationName?: string;
    organizationId?: string;
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
    GENERAL_SETTINGS = "GENERAL_SETTINGS",

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
    object: NatsObject;
    objectType: NatsObjectType;
}
interface NatsObject
    extends NatsNameObject,
        NatsIdObject,
        NatsMemberObject,
        NatsSecretObject,
        NatsExecTargetObject,
        High5ExecuteOnAgentRequest,
        High5ExecutionCancelRequest {
    [NatsSubject.IDP_USER_GENERAL]: unknown;
    [NatsSubject.IDP_USER_MESSAGES]: unknown;
    [NatsSubject.IDP_USER_SETTINGS_PATS]: NatsIdObject;
    [NatsSubject.IDP_USER_SETTINGS_OAUTH]: unknown;
    [NatsSubject.IDP_USER_SETTINGS_NOTIFICATIONS]: NatsIdObject;
    [NatsSubject.IDP_USER_GENERAL_SETTINGS]: unknown;
    [NatsSubject.IDP_ORGANIZATION_GENERAL]: NatsNameObject;
    [NatsSubject.IDP_ORGANIZATION_MEMBERS]: NatsMemberObject;
    [NatsSubject.IDP_ORGANIZATION_MEMBERS_EXECUTION_TARGET]: NatsExecTargetObject;
    [NatsSubject.IDP_ORGANIZATION_TEAMS]: NatsNameObject;
    [NatsSubject.HIGH5_SPACES]: NatsNameObject;
    [NatsSubject.HIGH5_STREAM_EXECUTE]: High5ExecuteOnAgentRequest | High5ExecutionCancelRequest;
    [NatsSubject.HIGH5_STREAM_CANCEL]: High5ExecuteOnAgentRequest | High5ExecutionCancelRequest;
    [NatsSubject.HIGH5_EVENTS]: NatsNameObject;
    [NatsSubject.HIGH5_STREAMS]: NatsIdObject;
    [NatsSubject.HIGH5_SECRETS]: NatsSecretObject;
    [NatsSubject.HIGH5_SETTINGS_GENERAL]: unknown;
    [NatsSubject.HIGH5_SETTINGS_WEBHOOKS]: NatsIdObject;
    [NatsSubject.FUSE_SPACES]: NatsNameObject;
    [NatsSubject.FUSE_JOBS]: NatsIdObject;
    [NatsSubject.FUSE_JOB_LOGS]: NatsIdObject;
    [NatsSubject.FUSE_JOBS_TRIGGER]: unknown;
    [NatsSubject.DEBUG_NAMESPACE]: string;
}

interface NatsNameObject {
    name: string;
}
interface NatsIdObject {
    _id: string;
}

interface NatsMemberObject {
    userId: string;
}

interface NatsExecTargetObject extends NatsMemberObject {
    executionTarget: boolean;
}

interface NatsSecretObject {
    secretKey: string;
}
type NatsCallback = (err: Error | null, msg?: NatsMessage, rawMsg?: Msg) => void;

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
                static GENERAL_SETTINGS = (userId: string) => {
                    return NatsSubjects.replace(NatsSubject.IDP_USER_GENERAL, { userId } as NatsSubjectReplacements);
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
        static SPACES = (organizationName: string) => {
            return NatsSubjects.replace(NatsSubject.FUSE_SPACES, { organizationName } as NatsSubjectReplacements);
        };
        static Space = class {
            static Jobs = class {
                static JOBS = (organizationName: string, spaceName: string) => {
                    return NatsSubjects.replace(NatsSubject.FUSE_JOBS, { organizationName, spaceName } as NatsSubjectReplacements);
                };

                static JOB_LOGS = (organizationName: string, spaceName: string) => {
                    return NatsSubjects.replace(NatsSubject.FUSE_JOB_LOGS, { organizationName, spaceName } as NatsSubjectReplacements);
                };
            };
        };
    };

    static High5 = class {
        static Execution = class {
            static EXECUTE = (organizationId: string, base64email: string) => {
                return NatsSubjects.replace(NatsSubject.HIGH5_STREAM_EXECUTE, { organizationId, base64email } as NatsSubjectReplacements);
            };

            static CANCEL = (organizationId: string, base64email: string) => {
                return NatsSubjects.replace(NatsSubject.HIGH5_STREAM_CANCEL, { organizationId, base64email } as NatsSubjectReplacements);
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
        subject = subject.replace("${organizationId}", replacements.organizationId || "null");
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

export { NatsSubjects, NatsMessageType, NatsObjectType, NatsObject, NatsSubject, NatsMessage, NatsCallback, Msg as RawMsg };
