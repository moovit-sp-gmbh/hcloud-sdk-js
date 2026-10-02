import assert from "node:assert";
import { describe, it } from "node:test";
import { HCloud } from "../src/lib/Hcloud";

describe("HCloud.clone", () => {
    it("copies server, auth token and correlationID", () => {
        const original = new HCloud({ server: "http://idp:3000" }).setAuthToken("Bearer original").setCorrelationId("correlation-1");

        const copy = original.clone();

        assert.strictEqual(copy.getServer(), "http://idp:3000");
        assert.strictEqual(copy.getAuthToken(), "Bearer original");
        assert.strictEqual(copy.getCorrelationId(), "correlation-1");
    });

    it("does not leak changes of the copy into the original", () => {
        const original = new HCloud({ server: "http://idp:3000" }).setAuthToken("Bearer original").setCorrelationId("correlation-1");

        original.clone().setServer("http://high5:3000").setAuthToken("Bearer user").setCorrelationId("correlation-2");

        assert.strictEqual(original.getServer(), "http://idp:3000");
        assert.strictEqual(original.getAuthToken(), "Bearer original");
        assert.strictEqual(original.getCorrelationId(), "correlation-1");
    });

    it("does not leak changes of the original into the copy", () => {
        const original = new HCloud({ server: "http://idp:3000" }).setAuthToken("Bearer original");
        const copy = original.clone();

        original.setServer("http://cosmo:3000").setAuthToken("Bearer changed");

        assert.strictEqual(copy.getServer(), "http://idp:3000");
        assert.strictEqual(copy.getAuthToken(), "Bearer original");
    });

    it("uses its own axios instance", () => {
        const original = new HCloud({ server: "http://idp:3000" });

        assert.notStrictEqual(original.clone().getAxios(), original.getAxios());
    });

    it("shares the NATS service (and therefore its connection)", () => {
        const original = new HCloud({ server: "http://idp:3000" });

        assert.strictEqual(original.clone().Nats, original.Nats);
    });
});
