import { Msg } from "nats";
enum NatsSubject {
    HIGH5_ORGANIZATION_APP_EVENT_STREAM = "hcloud.high5.organization.${organizationId}.app.${appId}.event.${eventId}.stream",
}

class NatsSubjects {
    static ListeForStreams(organizationId: string, appId: string, eventId: string) {
        return NatsSubject.HIGH5_ORGANIZATION_APP_EVENT_STREAM.replace("${organizationId}", organizationId)
            .replace("${appId}", appId)
            .replace("${eventId}", eventId);
    }
}

enum NatsMessageType {
    ADD = "ADD",
    UPDATE = "UPDATE",
    DELETE = "DELETE",
}

interface NatsMessage {
    type: NatsMessageType;
    object: any;
}

type NatsCallback = (msg: NatsMessage, rawMsg: Msg) => void;

export { NatsSubjects, NatsMessageType, NatsMessage, NatsCallback };
