import hcloud from "../../src/lib/hcloud";
import { expect } from "chai";
import { AxiosError, AxiosResponse } from "axios";
import { User, Token } from "../../src/lib/interfaces/IDP";
import { AuditLog, Level, Origin, Type, Event } from "../../src/lib/interfaces/Auditor";
import { Version, ErrorMessage } from "../../src/lib/interfaces/Global";
import { v4 as uuidv4 } from "uuid";

describe("Auditor", () => {
    const hcloudClient = new hcloud({ api: "https://dev.app.helmut.cloud" });
    let token = "";

    it("Version OK", () => {
        return hcloudClient.Auditor.version()
            .then((resp: Version) => {
                expect(resp.version).to.be.a.string;
            })
            .catch((err: AxiosError) => {
                throw err;
            });
    });

    it("Register OK", () => {
        const name = `Severin Siebertz ${uuidv4()}`;
        return hcloudClient.IDP.register(name, `s.siebertz@moovit-sp-${uuidv4()}.com`, "Sev2000Sev")
            .then((resp: User) => {
                expect(resp.name).to.equal(name);
            })
            .catch((err: AxiosError) => {
                throw err;
            });
    });

    it("Authenticate OK", () => {
        return hcloudClient.IDP.authenticate("s.siebertz@moovit-sp.com", "Sev2000Sev")
            .then((resp: Token) => {
                expect(resp.token).to.contain("Bearer ");
                token = resp.token;
                hcloudClient.setAuthToken(resp.token);
            })
            .catch((err: AxiosError) => {
                throw err;
            });
    });

    describe("Get logs", function () {
        it("GetAuditLogs ERR", () => {
            return hcloudClient.Auditor.getAuditLogs(null, null, null).catch((err: AxiosError) => {
                const resp = err.response?.data as ErrorMessage;
                expect(resp.code).to.equal("002.001.0001");
                expect(resp.error).to.equal("missing.auth.token");
            });
        });

        it("GetAuditLogs OK", () => {
            return hcloudClient.Auditor.getAuditLogs(null, null, null)
                .then((resp: AuditLog[]) => {
                    expect(resp).to.be.an("array");
                })
                .catch((err: AxiosError) => {
                    throw err;
                });
        });
    });

    describe("Add logs", function () {
        it("AddAuditLogs ERR", () => {
            return hcloudClient.Auditor.internal.addAuditLogs([]).catch((err: AxiosError) => {
                expect(err.code).to.equal("ERR_BAD_REQUEST");
            });
        });

        it.skip("AddAuditLogs OK", async () => {
            const hcloudClient = new hcloud({ api: "http://localhost:3004" }).setAuthToken(token);
            const res = await hcloudClient.Auditor.internal.addAuditLogs([createTestAuditLog()]).catch((err: unknown) => {
                console.log("failed", err);
            });
            console.log("success", res);
        });

        it.skip("AddAuditLogsToQueue OK", async () => {
            const hcloudClient = new hcloud({ api: "http://localhost:3004", auditor: { queue: { executionInterval: 100 } } }).setAuthToken(token);
            hcloudClient.Auditor.internal.queueAuditLogs([createTestAuditLog(), createTestAuditLog(), createTestAuditLog()]);
            await sleep(1000);
        });
    });
});

const sleep = (milliseconds: number): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
};

const createTestAuditLog = (): AuditLog => {
    return { origin: Origin.IDP, event: Event.Login, level: Level.DEBUG, type: Type.Update, message: "auditor test " + uuidv4() } as AuditLog;
};
