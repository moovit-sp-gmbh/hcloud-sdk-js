import { NatsConnection, SubscriptionOptions, NatsError, Msg, Subscription, PublishOptions, RequestOptions } from "nats";

import { connect as connectNode } from "nats";
import { connect as connectWs } from "nats.ws";
import { NatsMessage, NatsCallback, NatsMessageType } from "../../interfaces/Nats";

interface SubMapEntry {
    subject: string;
    sub: Subscription;
}

class Nats {
    private static instance: Nats;
    private natsConnection: NatsConnection | undefined;
    private subMap = [] as SubMapEntry[];
    private connection = window === undefined ? connectNode : connectWs;

    private constructor() {}

    public static getInstance() {
        if (!this.instance) {
            this.instance = new Nats();
        }
        return this.instance;
    }

    public async connect(email: string, jwt: string, servers?: string[]): Promise<NatsConnection> {
        if (!servers) {
            // set defaults if servers array is empty
            if (window === undefined) {
                // default kubernetes internal servers
                servers = ["hcloud-nats-0.hcloud-nats:4222", "hcloud-nats-1.hcloud-nats:4222", "hcloud-nats-2.hcloud-nats:4222"];
            } else {
                // default via traefik exposed servers
                const s = `${self.location.protocol === "https:" ? "wss" : "ws"}://${self.location.hostname}:${
                    self.location.port ? self.location.port : self.location.protocol === "https:" ? 443 : 80
                }`;
                servers = [`${s}/ws/nats/v1/0`, `${s}/ws/nats/v1/1`, `${s}/ws/nats/v1/2`];
            }
        }
        this.natsConnection = await this.connection({
            debug: true,
            maxReconnectAttempts: -1,
            servers: servers,
            user: email,
            pass: jwt,
        });
        return this.natsConnection;
    }

    public getConnection = (): NatsConnection | undefined => {
        return this.natsConnection;
    };

    public sub(subject: string, callback: NatsCallback, options?: SubscriptionOptions): void {
        let delay = 0;

        if (!this.getConnection() || this.getConnection()?.isClosed()) {
            delay = 3000;
        }

        // add delay just in case the connection has not been established yet
        setTimeout(() => {
            options = {
                ...options,
                callback: (err: NatsError | null, msg: Msg) => {
                    const data = new TextDecoder("utf-8").decode(msg.data);
                    callback(JSON.parse(data) as NatsMessage, msg);
                },
            };
            if (!this.getConnection() || !this.getConnection()?.isClosed) {
                throw new Error("connection not established, can not subscribe");
            }
            this.subMap.push({ subject, sub: this.getConnection()?.subscribe(subject, options) } as SubMapEntry);
        }, delay);
    }

    public unsub(subject: string): void {
        this.subMap.forEach((s: SubMapEntry) => {
            if (s.subject === subject) {
                s.sub.unsubscribe();
            }
        });
    }

    public publish(subject: string, type: NatsMessageType, object: any, options?: PublishOptions): void {
        const data = new TextEncoder().encode(JSON.stringify({ type: type, object: object } as NatsMessage));
        this.getConnection()?.publish(subject, data, options);
    }

    public request(subject: string, type: NatsMessageType, object: any, options?: RequestOptions): void {
        const data = new TextEncoder().encode(JSON.stringify({ type: type, object: object } as NatsMessage));
        this.getConnection()?.request(subject, data, options);
    }
}

export default Nats;
