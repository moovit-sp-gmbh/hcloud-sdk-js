import { connect as connectNode, Msg, NatsConnection, NatsError, PublishOptions, RequestOptions, Subscription, SubscriptionOptions } from "nats"
import { connect as connectWs } from "nats.ws"
import Base from "../../Base"
import { NatsCallback, NatsMessage, NatsMessageType, NatsObject, NatsObjectType, RawMsg } from "../../interfaces/nats"

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
class Nats extends Base {
    private natsConnection: NatsConnection | undefined;
    private subMap = [] as SubMapEntry[];
    private connection = isBrowser ? connectWs : connectNode;

    // eslint-disable-next-line complexity
    public async connect(params: ConnectParamsJwt | ConnectParamsPassword): Promise<NatsConnection> {
        let previousSubs = [] as SubMapEntry[];
        if (this.natsConnection && !this.natsConnection.isClosed()) {
            previousSubs = [...this.subMap];
            await this.natsConnection.close();
            this.subMap = [] as SubMapEntry[];
        }

        if (params.forceWebsocket) {
            this.connection = connectWs;
        }

        if (!params.servers) {
            // set defaults if servers array is empty
            if (isBrowser) {
                // default via traefik exposed servers
                params.servers = [this.getEndpoint("/v1/0"), this.getEndpoint("/v1/1"), this.getEndpoint("/v1/2")];
            } else {
                // default kubernetes internal servers
                params.servers = ["hcloud-nats-0.hcloud-nats:4222", "hcloud-nats-1.hcloud-nats:4222", "hcloud-nats-2.hcloud-nats:4222"];
            }
        }
        this.natsConnection = await this.connection({
            debug: params.debug,
            maxReconnectAttempts: -1,
            servers: params.servers,
            pingInterval: 55 * 1000, //ping every 55 seconds
            user: (params as ConnectParamsJwt).email !== undefined ? (params as ConnectParamsJwt).email : (params as ConnectParamsPassword).username,
            pass: (params as ConnectParamsJwt).jwt !== undefined ? (params as ConnectParamsJwt).jwt : (params as ConnectParamsPassword).password,
        });

        for (const entry of previousSubs) {
            await this.sub(entry.subject, (err, data, msg) => {
                entry.sub.callback?.(err as NatsError, msg ? msg : ({} as Msg));
            });
        }

        return this.natsConnection;
    }

    public getConnection = (): NatsConnection | undefined => {
        return this.natsConnection;
    };

    public async sub(subject: string, callback: NatsCallback, options?: SubscriptionOptions): Promise<Subscription> {
        const delay = 500;
        const trySubscribe = async (): Promise<Subscription> => {
            const conn = this.getConnection();

            // if connection not ready, retry after delay
            if (!conn || conn.isClosed()) {
                await new Promise(res => setTimeout(res, delay));
                return trySubscribe();
            }

            try {
                const newOptions = {
                    ...options,
                    callback: (err: NatsError | null, msg: Msg) => {
                        if (err) {
                            try {
                                callback(err);
                            } catch {
                                // ignore callback errors
                            }
                            return;
                        }

                        let parsedData: NatsMessage;
                        try {
                            const data = new TextDecoder("utf-8").decode(msg.data);
                            parsedData = JSON.parse(data);
                        } catch (e) {
                            callback(e as Error);
                            return;
                        }

                        try {
                            callback(null, parsedData, msg);
                        } catch {
                            // ignore callback errors
                        }
                    },
                };

                const sub = conn.subscribe(subject, newOptions);
                this.subMap.push({ subject, sub } as SubMapEntry);
                return sub;
            } catch (err) {
                err;
                // if subscription fails, retry after delay
                await new Promise(res => setTimeout(res, delay));
                return trySubscribe();
            }
        };

        return trySubscribe();
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

    public publish(subject: string, type: NatsMessageType, objectType: NatsObjectType, object: NatsObject, options?: PublishOptions): void {
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

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/ws/nats${endpoint}`;
    }
}

export default Nats;
