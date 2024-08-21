import { Msg } from "nats";
import { Products } from "../global";
import { High5ExecuteOnAgentRequest, High5ExecutionCancelRequest } from "../high5/space/execution";
import { LicenseTier } from "../idp";

enum NatsSubject {
    IDP_USER_GENERAL = "hcloud.idp.user.${userId}.general",
    IDP_USER_PROFILE = "hcloud.idp.user.${userId}.profile",
    IDP_USER_MESSAGES = "hcloud.idp.user.${userId}.messages",
    IDP_USER_SETTINGS_OAUTH = "hcloud.idp.user.${userId}.settings.oauth",
    IDP_USER_NOTIFICATIONS = "hcloud.idp.user.${userId}.notifications",
    IDP_USER_ORGS = "hcloud.idp.user.${userId}.orgs",
    IDP_USER_INVITATIONS = "hcloud.idp.user.${userId}.invitations",
    IDP_USER_SECURITY_PATS = "hcloud.idp.user.${userId}.security.pats",
    IDP_USER_SECURITY_GENERAL = "hcloud.idp.user.${userId}.security.general",

    IDP_ORGANIZATION_GENERAL = "hcloud.idp.organization.${base64orgName}.general",
    IDP_ORGANIZATION_INVITATIONS = "hcloud.idp.organization.${base64orgName}.invitations",
    IDP_ORGANIZATION_MEMBERS = "hcloud.idp.organization.${base64orgName}.members",
    IDP_ORGANIZATION_MEMBERS_EXECUTION_TARGET = "hcloud.idp.organization.${base64orgName}.members.${base64email}.executionTarget",
    IDP_ORGANIZATION_TEAMS = "hcloud.idp.organization.${base64orgName}.teams",
    IDP_ORGANIZATION_TEAM_MEMBERS = "hcloud.idp.organization.${base64orgName}.teams.${base64teamName}.members",
    IDP_ORGANIZATION_LICENSE = "hcloud.idp.organization.${base64orgName}.license",

    HIGH5_SPACES = "hcloud.high5.organization.${base64orgName}.spaces",
    HIGH5_SPACE = "hcloud.high5.organization.${base64orgName}.spaces.${base64spaceName}.>",
    HIGH5_SPACE_PERMISSIONS = "hcloud.high5.organization.${base64orgName}.spaces.${base64spaceName}.permissions",
    HIGH5_STREAM_EXECUTE = "hcloud.high5.organization.${organizationId}.stream.execute.${base64email}",
    HIGH5_STREAM_CANCEL = "hcloud.high5.organization.${organizationId}.stream.execute.${base64email}",
    HIGH5_EVENTS = "hcloud.high5.organization.${base64orgName}.spaces.${base64spaceName}.events",
    HIGH5_STREAMS = "hcloud.high5.organization.${base64orgName}.spaces.${base64spaceName}.streams",
    HIGH5_EVENT_STREAMS = "hcloud.high5.organization.${base64orgName}.spaces.${base64spaceName}.events.${base64eventName}.streams",
    HIGH5_SECRETS = "hcloud.high5.organization.${base64orgName}.spaces.${base64spaceName}.secrets",
    HIGH5_SETTINGS = "hcloud.high5.organization.${base64orgName}.spaces.${base64spaceName}.settings",
    HIGH5_WEBHOOKS = "hcloud.high5.organization.${base64orgName}.spaces.${base64spaceName}.webhooks",
    HIGH5_WEBHOOK_LOGS = "hcloud.high5.organization.${base64orgName}.spaces.${base64spaceName}.webhooks.${webhookId}.logs",
    HIGH5_CATALOGS = "hcloud.high5.organization.${base64orgName}.spaces.${base64spaceName}.catalogs",
    HIGH5_NODES = "hcloud.high5.organization.${base64orgName}.spaces.${base64spaceName}.node",
    High5_DESIGN = "hcloud.high5.organization.${base64orgName}.spaces.${base64spaceName}.events.${base64eventName}.streams.${streamId}.design",
    HIGH5_SNAPSHOTS = "hcloud.high5.organization.${base64orgName}.spaces.${base64spaceName}.events.${base64eventName}.streams.${streamId}.snapshots",

    FUSE_SPACES = "hcloud.fuse.organization.${base64orgName}.spaces",
    FUSE_SPACE = "hcloud.fuse.organization.${base64orgName}.spaces.${base64spaceName}.>",
    FUSE_SPACE_PERMISSIONS = "hcloud.fuse.organization.${base64orgName}.spaces.${base64spaceName}.permissions",
    FUSE_JOBS = "hcloud.fuse.organization.${base64orgName}.spaces.${base64spaceName}.jobs",
    FUSE_JOB_LOGS = "hcloud.fuse.organization.${base64orgName}.spaces.${base64spaceName}.jobs.${jobId}.logs",
    FUSE_JOBS_TRIGGER = "hcloud.fuse.organization.${base64orgName}.spaces.${base64spaceName}.jobs.trigger",

    AUDITOR_LOGS = "hcloud.auditor.organization.${base64orgName}.logs",

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
    email?: string;
    webhookId?: string;
    jobId?: string;
    teamName?: string;
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
    ORGANIZATION_INVITATION = "ORGANIZATION_INVITATION",
    ORGANIZATION_MEMBER = "ORGANIZATION_MEMBER",
    ORGANIZATION_LICENSE = "ORGANIZATION_LICENSE",
    PAT = "PAT",
    TEAM = "TEAM",
    NOTIFICATIONS = "NOTIFICATIONS",
    GENERAL_SETTINGS = "GENERAL_SETTINGS",

    SPACE = "SPACE",
    SPACE_PERMISSION = "SPACE_PERMISSION",
    DESIGN = "DESIGN",
    SNAPSHOT = "SNAPSHOT",
    EVENT = "EVENT",
    EXECUTION = "EXECUTION",
    NODE = "NODE",
    STREAM = "STREAM",
    WEBHOOK = "WEBHOOK",
    WEBHOOK_LOG = "WEBHOOK_LOG",
    SECRET = "SECRET",
    CATALOG = "CATALOG",

    AUDIT_LOG = "AUDIT_LOG",
    MAIL = "MAIL",

    CRONJOB = "CRONJOB",
    CRONJOB_ID = "CRONJOB_ID",
    CRONJOB_LOG = "CRONJOB_LOG",
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
        High5ExecutionCancelRequest,
        NatsLicenseObject,
        NatsCustomNodeObject {
    [NatsSubject.IDP_USER_GENERAL]: NatsIdObject;
    [NatsSubject.IDP_USER_PROFILE]: NatsIdObject;
    [NatsSubject.IDP_USER_MESSAGES]: unknown;
    [NatsSubject.IDP_USER_SECURITY_PATS]: NatsIdObject;
    [NatsSubject.IDP_USER_SECURITY_GENERAL]: unknown;
    [NatsSubject.IDP_USER_SETTINGS_OAUTH]: unknown;
    [NatsSubject.IDP_USER_NOTIFICATIONS]: NatsIdObject;
    [NatsSubject.IDP_USER_INVITATIONS]: NatsIdObject;
    [NatsSubject.IDP_ORGANIZATION_GENERAL]: NatsNameObject;
    [NatsSubject.IDP_ORGANIZATION_INVITATIONS]: NatsIdObject;
    [NatsSubject.IDP_ORGANIZATION_MEMBERS]: NatsMemberObject;
    [NatsSubject.IDP_ORGANIZATION_MEMBERS_EXECUTION_TARGET]: NatsExecTargetObject;
    [NatsSubject.IDP_ORGANIZATION_TEAMS]: NatsNameObject;
    [NatsSubject.IDP_ORGANIZATION_TEAM_MEMBERS]: NatsIdObject;
    [NatsSubject.IDP_ORGANIZATION_LICENSE]: NatsLicenseObject;
    [NatsSubject.HIGH5_SPACES]: NatsNameObject;
    [NatsSubject.HIGH5_SPACE]: NatsNameObject;
    [NatsSubject.HIGH5_SPACE_PERMISSIONS]: NatsIdObject;
    [NatsSubject.HIGH5_STREAM_EXECUTE]: High5ExecuteOnAgentRequest | High5ExecutionCancelRequest;
    [NatsSubject.HIGH5_STREAM_CANCEL]: High5ExecuteOnAgentRequest | High5ExecutionCancelRequest;
    [NatsSubject.HIGH5_EVENTS]: NatsNameObject;
    [NatsSubject.HIGH5_STREAMS]: NatsIdObject;
    [NatsSubject.HIGH5_EVENT_STREAMS]: NatsIdObject;
    [NatsSubject.High5_DESIGN]: NatsIdObject;
    [NatsSubject.HIGH5_SNAPSHOTS]: NatsIdObject;
    [NatsSubject.HIGH5_NODES]: NatsCustomNodeObject;
    [NatsSubject.HIGH5_SECRETS]: NatsSecretObject;
    [NatsSubject.HIGH5_SETTINGS]: unknown;
    [NatsSubject.HIGH5_WEBHOOKS]: NatsIdObject;
    [NatsSubject.HIGH5_WEBHOOK_LOGS]: NatsIdObject;
    [NatsSubject.HIGH5_CATALOGS]: NatsIdObject;
    [NatsSubject.FUSE_SPACES]: NatsNameObject;
    [NatsSubject.FUSE_SPACE]: NatsNameObject;
    [NatsSubject.FUSE_SPACE_PERMISSIONS]: NatsIdObject;
    [NatsSubject.FUSE_JOBS]: NatsIdObject;
    [NatsSubject.FUSE_JOB_LOGS]: NatsIdObject;
    [NatsSubject.FUSE_JOBS_TRIGGER]: unknown;
    [NatsSubject.AUDITOR_LOGS]: NatsIdObject;
    [NatsSubject.DEBUG_NAMESPACE]: string;
}

interface NatsNameObject {
    name: string;
    oldName?: string;
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

interface NatsLicenseObject {
    newTier: LicenseTier;
}

interface NatsCustomNodeObject {
    _id: string;
    updatedNodeId?: string;
}

type NatsCallback = (err: Error | null, msg?: NatsMessage, rawMsg?: Msg) => void;

/**
 * This helper class creates subject strings to be used with nats.subscribe and nats.publish
 */
class NatsSubjects {
    static IDP = class {
        static User = class {
            static GENERAL = (userId: string) => {
                return NatsSubjects.replace(NatsSubject.IDP_USER_GENERAL, { userId });
            };
            static PROFILE = (userId: string) => {
                return NatsSubjects.replace(NatsSubject.IDP_USER_PROFILE, { userId });
            };
            static MESSAGES = (userId: string) => {
                return NatsSubjects.replace(NatsSubject.IDP_USER_MESSAGES, { userId });
            };
            static ORGS = (userId: string) => {
                return NatsSubjects.replace(NatsSubject.IDP_USER_ORGS, { userId });
            };
            static INVITATIONS = (userId: string) => {
                return NatsSubjects.replace(NatsSubject.IDP_USER_INVITATIONS, { userId });
            };
            static NOTIFICATIONS = (userId: string) => {
                return NatsSubjects.replace(NatsSubject.IDP_USER_NOTIFICATIONS, { userId });
            };

            static Security = class {
                static PATS = (userId: string) => {
                    return NatsSubjects.replace(NatsSubject.IDP_USER_SECURITY_PATS, { userId });
                };
                static GENERAL = (userId: string) => {
                    return NatsSubjects.replace(NatsSubject.IDP_USER_SECURITY_GENERAL, { userId });
                };
            };

            static Settings = class {
                static OAUTH = (userId: string) => {
                    return NatsSubjects.replace(NatsSubject.IDP_USER_SETTINGS_OAUTH, { userId });
                };
                static GENERAL_SETTINGS = (userId: string) => {
                    return NatsSubjects.replace(NatsSubject.IDP_USER_GENERAL, { userId });
                };
            };
        };
        static Organization = class {
            static GENERAL = (organizationName: string) => {
                return NatsSubjects.replace(NatsSubject.IDP_ORGANIZATION_GENERAL, { organizationName });
            };
            static INVITATIONS = (organizationName: string) => {
                return NatsSubjects.replace(NatsSubject.IDP_ORGANIZATION_INVITATIONS, { organizationName });
            };
            static MEMBERS = (organizationName: string): string & { EXECUTION_TARGET: (email: string) => string } => {
                return Object.defineProperty(
                    Object(NatsSubjects.replace(NatsSubject.IDP_ORGANIZATION_MEMBERS, { organizationName })),
                    "EXECUTION_TARGET",
                    {
                        value: function (memberEmail: string) {
                            return NatsSubjects.replace(NatsSubject.IDP_ORGANIZATION_MEMBERS_EXECUTION_TARGET, {
                                organizationName,
                                email: memberEmail,
                            });
                        },
                        writable: false,
                        enumerable: false,
                        configurable: true,
                    }
                ) as string & { EXECUTION_TARGET: (email: string) => string };
            };
            static TEAMS = (organizationName: string) => {
                return NatsSubjects.replace(NatsSubject.IDP_ORGANIZATION_TEAMS, { organizationName });
            };
            static Teams = class {
                static MEMBERS = (organizationName: string, teamName: string) => {
                    return NatsSubjects.replace(NatsSubject.IDP_ORGANIZATION_TEAM_MEMBERS, { organizationName, teamName });
                };
            };
            static LICENSE = (organizationName: string) => {
                return NatsSubjects.replace(NatsSubject.IDP_ORGANIZATION_LICENSE, { organizationName });
            };
        };
    };

    static Fuse = class {
        static SPACES = (organizationName: string) => {
            return NatsSubjects.replace(NatsSubject.FUSE_SPACES, { organizationName });
        };
        static Space = class {
            static SPACE = (organizationName: string, spaceName: string) => {
                return NatsSubjects.replace(NatsSubject.FUSE_SPACE, { organizationName, spaceName });
            };
            static PERMISSIONS = (organizationName: string, spaceName: string) => {
                return NatsSubjects.replace(NatsSubject.FUSE_SPACE_PERMISSIONS, { organizationName, spaceName });
            };
            static Jobs = class {
                static JOBS = (organizationName: string, spaceName: string) => {
                    return NatsSubjects.replace(NatsSubject.FUSE_JOBS, { organizationName, spaceName });
                };

                static JOB_LOGS = (organizationName: string, spaceName: string, jobId: string) => {
                    return NatsSubjects.replace(NatsSubject.FUSE_JOB_LOGS, { organizationName, spaceName, jobId });
                };
            };
        };
    };

    static High5 = class {
        static Execution = class {
            static EXECUTE = (organizationId: string, email: string) => {
                return NatsSubjects.replace(NatsSubject.HIGH5_STREAM_EXECUTE, { organizationId, email });
            };

            static CANCEL = (organizationId: string, email: string) => {
                return NatsSubjects.replace(NatsSubject.HIGH5_STREAM_CANCEL, { organizationId, email });
            };
        };

        static SPACES = (organizationName: string) => {
            return NatsSubjects.replace(NatsSubject.HIGH5_SPACES, { organizationName });
        };

        static Space = class {
            static SPACE = (organizationName: string, spaceName: string) => {
                return NatsSubjects.replace(NatsSubject.HIGH5_SPACE, { organizationName, spaceName });
            };

            static PERMISSIONS = (organizationName: string, spaceName: string) => {
                return NatsSubjects.replace(NatsSubject.HIGH5_SPACE_PERMISSIONS, { organizationName, spaceName });
            };

            static EVENTS = (organizationName: string, spaceName: string) => {
                return NatsSubjects.replace(NatsSubject.HIGH5_EVENTS, { organizationName, spaceName });
            };

            static STREAMS = (organizationName: string, spaceName: string) => {
                return NatsSubjects.replace(NatsSubject.HIGH5_STREAMS, { organizationName, spaceName });
            };

            static Event = class {
                static STREAMS = (organizationName: string, spaceName: string, eventName: string) => {
                    return NatsSubjects.replace(NatsSubject.HIGH5_EVENT_STREAMS, {
                        organizationName,
                        spaceName,
                        eventName,
                    });
                };

                static Stream = class {
                    static DESIGN = (organizationName: string, spaceName: string, eventName: string, streamId: string) => {
                        return NatsSubjects.replace(NatsSubject.High5_DESIGN, {
                            organizationName,
                            spaceName,
                            eventName,
                            streamId,
                        });
                    };
                    static SNAPSHOTS = (organizationName: string, spaceName: string, eventName: string, streamId: string) => {
                        return NatsSubjects.replace(NatsSubject.HIGH5_SNAPSHOTS, {
                            organizationName,
                            spaceName,
                            eventName,
                            streamId,
                        });
                    };
                };
            };

            static SECRETS = (organizationName: string, spaceName: string) => {
                return NatsSubjects.replace(NatsSubject.HIGH5_SECRETS, { organizationName, spaceName });
            };

            static WEBHOOKS = (organizationName: string, spaceName: string) => {
                return NatsSubjects.replace(NatsSubject.HIGH5_WEBHOOKS, { organizationName, spaceName });
            };

            static Webhook = class {
                static LOGS = (organizationName: string, spaceName: string, webhookId: string) => {
                    return NatsSubjects.replace(NatsSubject.HIGH5_WEBHOOK_LOGS, {
                        organizationName,
                        spaceName,
                        webhookId,
                    });
                };
            };

            static SETTINGS = (organizationName: string, spaceName: string) => {
                return NatsSubjects.replace(NatsSubject.HIGH5_SETTINGS, { organizationName, spaceName });
            };

            static CATALOGS = (organizationName: string, spaceName: string) => {
                return NatsSubjects.replace(NatsSubject.HIGH5_CATALOGS, { organizationName, spaceName });
            };

            static NODES = (organizationName: string, spaceName: string) => {
                return NatsSubjects.replace(NatsSubject.HIGH5_NODES, { organizationName, spaceName });
            };
        };
    };

    static Auditor = class {
        static LOGS = (organizationName: string) => {
            return NatsSubjects.replace(NatsSubject.AUDITOR_LOGS, { organizationName });
        };
    };

    static Logging = (product: Products) => {
        return NatsSubjects.replace(NatsSubject.DEBUG_NAMESPACE, { product });
    };

    // eslint-disable-next-line complexity
    private static replace = (subject: string, replacements: NatsSubjectReplacements): string => {
        subject = subject.replace("${userId}", replacements.userId || "null");
        subject = subject.replace("${base64orgName}", replacements.organizationName ? base64Encode(replacements.organizationName) : "null");
        subject = subject.replace("${organizationId}", replacements.organizationId || "null");
        subject = subject.replace("${base64spaceName}", replacements.spaceName ? base64Encode(replacements.spaceName) : "null");
        subject = subject.replace("${base64eventName}", replacements.eventName ? base64Encode(replacements.eventName) : "null");
        subject = subject.replace("${streamId}", replacements.streamId || "null");
        subject = subject.replace("${designId}", replacements.designId || "null");
        subject = subject.replace("${nodeId}", replacements.nodeId || "null");
        subject = subject.replace("${product}", replacements.product || "null");
        subject = subject.replace("${base64email}", replacements.email ? base64Encode(replacements.email) : "null");
        subject = subject.replace("${webhookId}", replacements.webhookId || "null");
        subject = subject.replace("${jobId}", replacements.jobId || "null");
        subject = subject.replace("${base64teamName}", replacements.teamName ? base64Encode(replacements.teamName) : "null");

        return subject;
    };
}

const base64Encode = (str: string) => {
    if (typeof window === "undefined") {
        return Buffer.from(str).toString("base64");
    } else {
        return btoa(str);
    }
};

export { NatsSubjects, NatsMessageType, NatsObjectType, NatsObject, NatsSubject, NatsMessage, NatsCallback, Msg as RawMsg };
