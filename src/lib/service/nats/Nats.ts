import { NatsConnection, SubscriptionOptions, NatsError, Msg, Subscription, PublishOptions, RequestOptions, connect as connectNode } from "nats";
import { connect as connectWs } from "nats.ws";
import { NatsMessage, NatsCallback, NatsMessageType, NatsObjectType, RawMsg } from "../../interfaces/Nats";

interface SubMapEntry {
    subject: string;
    sub: Subscription;
}

/**
 * Connect and authenticate using email and jwt
 *
 * to use websocket from within node, forceWebsocket can be used.
 * A websocket library is required to be pre-installed and needs to be set as global:
 * import WebSocket from "ws";
 * Object.assign(global, { WebSocket: WebSocket });
 */
type ConnectParamsJwt = {
    email: string;
    jwt: string;
    servers?: string[];
    debug?: boolean;
    forceWebsocket?: boolean;
};
/**
 * Connect and authenticate using username and password
 * Can only be used with the CUSTOM_AUTH admin!
 *
 * to use websocket from within node, forceWebsocket can be used.
 * A websocket library is required to be pre-installed and needs to be set as global:
 * import WebSocket from "ws";
 * Object.assign(global, { WebSocket: WebSocket });
 */
type ConnectParamsPassword = {
    username: string;
    password: string;
    servers?: string[];
    debug?: boolean;
    forceWebsocket?: boolean;
};

const isBrowser = typeof window !== "undefined";
class Nats {
    // eslint-disable-next-line no-use-before-define
    private natsConnection: NatsConnection | undefined;
    private subMap = [] as SubMapEntry[];
    private connection = isBrowser ? connectWs : connectNode;

    // eslint-disable-next-line complexity
    public async connect(params: ConnectParamsJwt | ConnectParamsPassword): Promise<NatsConnection> {
        if (params.forceWebsocket) {
            this.connection = connectWs;
        }

        if (!params.servers) {
            // set defaults if servers array is empty
            if (isBrowser) {
                // default via traefik exposed servers
                const s = `${self.location.protocol === "https:" ? "wss" : "ws"}://${self.location.hostname}:${
                    self.location.port ? self.location.port : self.location.protocol === "https:" ? 443 : 80
                }`;
                params.servers = [`${s}/ws/nats/v1/0`, `${s}/ws/nats/v1/1`, `${s}/ws/nats/v1/2`];
            } else {
                // default kubernetes internal servers
                params.servers = ["hcloud-nats-0.hcloud-nats:4222", "hcloud-nats-1.hcloud-nats:4222", "hcloud-nats-2.hcloud-nats:4222"];
            }
        }
        this.natsConnection = await this.connection({
            debug: params.debug,
            maxReconnectAttempts: -1,
            servers: params.servers,
            user: (params as ConnectParamsJwt).email !== undefined ? (params as ConnectParamsJwt).email : (params as ConnectParamsPassword).username,
            pass: (params as ConnectParamsJwt).jwt !== undefined ? (params as ConnectParamsJwt).jwt : (params as ConnectParamsPassword).password,
        });
        return this.natsConnection;
    }

    public getConnection = (): NatsConnection | undefined => {
        return this.natsConnection;
    };

    public sub(subject: string, callback: NatsCallback, options?: SubscriptionOptions): Promise<Subscription> {
        let delay = 0;

        if (!this.getConnection() || this.getConnection()?.isClosed()) {
            delay = 3000;
        }

        // add delay just in case the connection has not been established yet
        return new Promise<Subscription>((resolve, reject) => {
            const newOptions = {
                ...options,
                callback: (err: NatsError | null, msg: Msg) => {
                    const data = new TextDecoder("utf-8").decode(msg.data);
                    callback(JSON.parse(data) as NatsMessage, msg);
                },
            };

            setTimeout(() => {
                if (!this.getConnection() || !this.getConnection()?.isClosed) {
                    reject(new Error("connection not established, can not subscribe"));
                }

                const sub = this.getConnection()?.subscribe(subject, newOptions);
                if (sub) {
                    this.subMap.push({ subject, sub: sub } as SubMapEntry);
                    return resolve(sub);
                }

                return reject(new Error("could not subscribe"));
            }, delay);
        });
    }

    public unsub(subject: string | Subscription): void {
        if (typeof subject === "string") {
            this.subMap.forEach((s: SubMapEntry) => {
                if (s.subject === subject) {
                    s.sub.unsubscribe();
                }
            });
        } else {
            (subject as Subscription)?.unsubscribe();
        }
    }

    public publish(subject: string, type: NatsMessageType, objectType: NatsObjectType, object: unknown, options?: PublishOptions): void {
        const data = new TextEncoder().encode(JSON.stringify({ type: type, objectType: objectType, object: object } as NatsMessage));
        this.getConnection()?.publish(subject, data, options);
    }

    public request(subject: string, type: NatsMessageType, objectType: NatsObjectType, object: unknown, options?: RequestOptions): void {
        const data = new TextEncoder().encode(JSON.stringify({ type: type, objectType: objectType, object: object } as NatsMessage));
        this.getConnection()?.request(subject, data, options);
    }

    public async requestAndWaitForResponse(
        subject: string,
        type: NatsMessageType,
        objectType: NatsObjectType,
        object: unknown,
        options?: RequestOptions
    ): Promise<Msg | undefined> {
        const data = new TextEncoder().encode(JSON.stringify({ type: type, objectType: objectType, object: object } as NatsMessage));
        return this.getConnection()?.request(subject, data, options) || undefined;
    }

    public respond(msg: Msg | RawMsg, data: unknown): void {
        const encodedData = new TextEncoder().encode(JSON.stringify(data));
        msg.respond(encodedData);
    }
}

export default Nats;
