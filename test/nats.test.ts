import assert from "node:assert";
import { describe, it } from "node:test";
import Nats from "../src/lib/service/nats";

interface RecordedSubscribeCall {
    subject: string;
    options?: { queue?: string };
}

/**
 * Minimal stand-in for a NatsConnection/Subscription pair, just enough to exercise
 * Nats.connect()'s reconnect/resubscribe path without a real NATS server.
 */
function createFakeConnectionFactory() {
    const subscribeCalls: RecordedSubscribeCall[] = [];
    const reconnectCalls: number[] = [];

    const connectionFactory = async () => {
        const conn = {
            isClosed: () => false,
            close: async () => undefined,
            reconnect: () => {
                reconnectCalls.push(Date.now());
            },
            subscribe: (subject: string, options?: { queue?: string }) => {
                subscribeCalls.push({ subject, options });
                return {
                    callback: () => undefined,
                    unsubscribe: () => undefined,
                    isClosed: () => false,
                };
            },
        };
        return conn as unknown as Awaited<ReturnType<Nats["connect"]>>;
    };

    return { connectionFactory, subscribeCalls, reconnectCalls };
}

describe("Nats service", () => {
    describe("connect", () => {
        it("preserves subscription options (e.g. queue group) across a reconnect", async () => {
            const { connectionFactory, subscribeCalls } = createFakeConnectionFactory();

            const nats = new Nats({ server: "http://localhost" }, {} as never);
            (nats as unknown as { connection: typeof connectionFactory }).connection = connectionFactory;

            await nats.connect({ email: "agent@helmut.cloud", jwt: "token", servers: ["ws://localhost/v1/0"] });
            await nats.sub("hcloud.high5.organization.org.watchfolder.wf.scan", () => undefined, { queue: "watchfolder" });

            // Simulates ContextManager.reconnect() in the agent: connect() called again while
            // already connected, e.g. to pick up NATS permissions for a newly assigned watch folder.
            await nats.connect({ email: "agent@helmut.cloud", jwt: "token", servers: ["ws://localhost/v1/0"] });

            assert.strictEqual(subscribeCalls.length, 2, "expected one initial subscribe and one resubscribe after reconnecting");
            assert.strictEqual(subscribeCalls[0].options?.queue, "watchfolder");
            assert.strictEqual(subscribeCalls[1].options?.queue, "watchfolder", "queue group must survive the resubscribe done by connect()");
        });

        it("does not force an extra reconnect after (re)connecting", async () => {
            const { connectionFactory, reconnectCalls } = createFakeConnectionFactory();

            const nats = new Nats({ server: "http://localhost" }, {} as never);
            (nats as unknown as { connection: typeof connectionFactory }).connection = connectionFactory;

            await nats.connect({ email: "agent@helmut.cloud", jwt: "token", servers: ["ws://localhost/v1/0"] });
            await nats.sub("hcloud.high5.organization.org.watchfolder.wf.scan", () => undefined, { queue: "watchfolder" });
            await nats.connect({ email: "agent@helmut.cloud", jwt: "token", servers: ["ws://localhost/v1/0"] });

            assert.strictEqual(reconnectCalls.length, 0, "connect() must not force the underlying transport to reconnect again");
        });
    });
});
