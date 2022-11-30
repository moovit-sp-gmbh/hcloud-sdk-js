import { Msg } from "nats";

enum NatsSubject {
    IDP_USER_GENERAL = "hcloud.idp.user.${userId}.general",
    IDP_USER_MESSAGES = "hcloud.idp.user.${userId}.messages",
    IDP_USER_SETTINGS_PATS = "hcloud.idp.user.${userId}.settings.pats",
    IDP_USER_SETTINGS_OAUTH = "hcloud.idp.user.${userId}.settings.oauth",

    IDP_ORGANIZATION_GENERAL = "hcloud.idp.organization.${organizationId}",
    IDP_ORGANIZATION_MEMBERS = "hcloud.idp.organization.${organizationId}.members",

    HIGH5_APPS = "hcloud.high5.organization.${organizationId}.apps",
    HIGH5_EVENTS = "hcloud.high5.organization.${organizationId}.app.${appId}.events",
    HIGH5_STREAMS = "hcloud.high5.organization.${organizationId}.app.${appId}.event.${eventId}.streams",
    HIGH5_SETTINGS_GENERAL = "hcloud.high5.organization.${organizationId}.app.${appId}.settings.general",
    HIGH5_SETTINGS_WEBHOOKS = "hcloud.high5.organization.${organizationId}.app.${appId}.settings.webhooks",
}

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
        };
    };

    static High5 = class {
        static APPS = (organizationId: string) => {
            return NatsSubjects.replace(NatsSubject.HIGH5_APPS, { organizationId } as NatsSubjectReplacements);
        };

        static App = class {
            static EVENTS = (organizationId: string, appId: string) => {
                return NatsSubjects.replace(NatsSubject.HIGH5_EVENTS, { organizationId, appId } as NatsSubjectReplacements);
            };

            static Event = class {
                static STREAMS = (organizationId: string, appId: string, eventId: string) => {
                    return NatsSubjects.replace(NatsSubject.HIGH5_STREAMS, { organizationId, appId, eventId } as NatsSubjectReplacements);
                };
            };

            static Settings = class {
                static GENERAL = (organizationId: string, appId: string) => {
                    return NatsSubjects.replace(NatsSubject.HIGH5_SETTINGS_GENERAL, { organizationId, appId } as NatsSubjectReplacements);
                };
                static WEBHOOKS = (organizationId: string, appId: string) => {
                    return NatsSubjects.replace(NatsSubject.HIGH5_SETTINGS_WEBHOOKS, { organizationId, appId } as NatsSubjectReplacements);
                };
            };
        };
    };

    private static replace = (subject: string, replacements: NatsSubjectReplacements): string => {
        subject = subject.replace("${userId}", replacements.userId || "null");
        subject = subject.replace("${organizationId}", replacements.organizationId || "null");
        subject = subject.replace("${appId}", replacements.appId || "null");
        subject = subject.replace("${eventId}", replacements.eventId || "null");
        subject = subject.replace("${streamId}", replacements.streamId || "null");
        subject = subject.replace("${designId}", replacements.designId || "null");
        subject = subject.replace("${nodeId}", replacements.nodeId || "null");

        return subject;
    };
}

type NatsSubjectReplacements = {
    userId?: string;
    organizationId?: string;
    appId?: string;
    eventId?: string;
    streamId?: string;
    designId?: string;
    nodeId?: string;
};

enum NatsMessageType {
    ADD = "ADD",
    UPDATE = "UPDATE",
    DELETE = "DELETE",
    EXECUTE = "EXECUTE"
}
interface NatsMessage {
    type: NatsMessageType;
    object: any;
}

type NatsCallback = (msg: NatsMessage, rawMsg: Msg) => void;

export { NatsSubjects, NatsMessageType, NatsMessage, NatsCallback, Msg as RawMsg };
