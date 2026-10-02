import { ErrorCode, Events, Status } from "nats";
import assert from "node:assert";
import { describe, it } from "node:test";
import Nats, { reconnectDelay } from "../src/lib/service/nats";

/**
 * Fake NatsConnection whose status() stream is fed by the test, recording the options passed to connect().
 */
function createFakeConnection() {
    const queue: Status[] = [];
    let wake: (() => void) | undefined;
    let closed = false;
    let options: { reconnectDelayHandler?: () => number } = {};

    const emit = (status: Status) => {
        queue.push(status);
        wake?.();
    };

    const conn = {
        isClosed: () => closed,
        close: async () => {
            closed = true;
            wake?.();
        },
        subscribe: () => ({ callback: () => undefined, unsubscribe: () => undefined, isClosed: () => false }),
        status: () => ({
            async *[Symbol.asyncIterator]() {
                while (!closed) {
                    if (queue.length === 0) {
                        await new Promise<void>(resolve => (wake = resolve));
                        continue;
                    }
                    yield queue.shift() as Status;
                }
            },
        }),
    };

    const connectionFactory = async (opts: typeof options) => {
        options = opts;
        return conn as unknown as Awaited<ReturnType<Nats["connect"]>>;
    };

    return { connectionFactory, emit, isClosed: () => closed, getOptions: () => options };
}

const authError: Status = { type: Events.Error, data: ErrorCode.AuthorizationViolation };
const flush = () => new Promise(resolve => setImmediate(resolve));

async function connectWithFake(onAuthError?: (n: number) => boolean | Promise<boolean>) {
    const fake = createFakeConnection();
    const nats = new Nats({ server: "http://localhost" }, {} as never);
    (nats as unknown as { connection: typeof fake.connectionFactory }).connection = fake.connectionFactory;
    await nats.connect({ email: "agent@helmut.cloud", jwt: "token", servers: ["ws://localhost/v1/0"], onAuthError });
    return fake;
}

describe("Nats authorization errors", () => {
    it("reconnectDelay starts at ~2s, doubles per consecutive auth error and is capped at ~5min", () => {
        for (const [errors, min] of [
            [0, 2000],
            [1, 4000],
            [2, 8000],
            [10, 300000],
        ]) {
            const delay = reconnectDelay(errors);
            assert.ok(delay >= min && delay < min + 1000, `${errors} errors: expected ${min}-${min + 1000}ms, got ${delay}`);
        }
    });

    it("backs off on consecutive auth errors and resets after a successful reconnect", async () => {
        const fake = await connectWithFake();
        const delay = () => fake.getOptions().reconnectDelayHandler!();

        assert.ok(delay() < 3000);
        fake.emit(authError);
        fake.emit(authError);
        await flush();
        assert.ok(delay() >= 8000 && delay() < 9000, "two auth errors in a row -> ~8s");

        fake.emit({ type: Events.Reconnect, data: "" });
        await flush();
        assert.ok(delay() < 3000, "a successful reconnect resets the backoff");
    });

    it("ignores errors other than authorization violations", async () => {
        const fake = await connectWithFake();

        fake.emit({ type: Events.Error, data: ErrorCode.PermissionsViolation });
        await flush();

        assert.ok(fake.getOptions().reconnectDelayHandler!() < 3000);
    });

    it("closes the connection once onAuthError returns false", async () => {
        const seen: number[] = [];
        const fake = await connectWithFake(n => {
            seen.push(n);
            return n < 3;
        });

        fake.emit(authError);
        fake.emit(authError);
        await flush();
        assert.strictEqual(fake.isClosed(), false);

        fake.emit(authError);
        await flush();
        assert.deepStrictEqual(seen, [1, 2, 3]);
        assert.strictEqual(fake.isClosed(), true);
    });

    it("keeps the connection when onAuthError returns true or no handler is given", async () => {
        const withHandler = await connectWithFake(async () => true);
        const withoutHandler = await connectWithFake();

        for (let i = 0; i < 5; i++) {
            withHandler.emit(authError);
            withoutHandler.emit(authError);
        }
        await flush();

        assert.strictEqual(withHandler.isClosed(), false);
        assert.strictEqual(withoutHandler.isClosed(), false);
    });
});
