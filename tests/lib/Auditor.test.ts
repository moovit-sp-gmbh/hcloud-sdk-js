import hcloud from "../../src/lib/hcloud";
import { expect } from "chai";
import { AxiosError, AxiosResponse } from "axios";
import { User, Token } from "../../src/lib/interfaces/IDP";
import { AuditLog } from "../../src/lib/interfaces/Auditor";
import { Version, ErrorMessage } from "../../src/lib/interfaces/Global";
import { v4 as uuidv4 } from "uuid";

describe("Auditor", () => {
    const h = new hcloud({ api: "https://dev.app.helmut.cloud" });

    it("Version OK", () => {
        return h.Auditor.version()
            .then((resp: Version) => {
                expect(resp.version).to.be.a.string;
            })
            .catch((err: AxiosError) => {
                throw err;
            });
    });

    it("GetAuditLogs ERR", () => {
        return h.Auditor.getAuditLogs(null, null, null).catch((err: AxiosError) => {
            const resp = err.response?.data as ErrorMessage;
            expect(resp.code).to.equal("002.001.0001");
            expect(resp.error).to.equal("missing.auth.token");
        });
    });

    it("Register OK", () => {
        const name = `Severin Siebertz ${uuidv4()}`;
        return h.IDP.register(name, `s.siebertz@moovit-sp-${uuidv4()}.com`, "Sev2000Sev")
            .then((resp: User) => {
                expect(resp.name).to.equal(name);
            })
            .catch((err: AxiosError) => {
                throw err;
            });
    });

    it("Authenticate OK", () => {
        return h.IDP.authenticate("s.siebertz@moovit-sp.com", "Sev2000Sev")
            .then((resp: Token) => {
                expect(resp.token).to.contain("Bearer ");
                h.setAuthToken(resp.token);
            })
            .catch((err: AxiosError) => {
                throw err;
            });
    });

    it("GetAuditLogs OK", () => {
        return h.Auditor.getAuditLogs(null, null, null)
            .then((resp: AuditLog[]) => {
                expect(resp).to.be.an("array");
            })
            .catch((err: AxiosError) => {
                throw err;
            });
    });


    it("AddAuditLogs ERR", () => {
        return h.Auditor.addAuditLogs([])
            .catch((err: AxiosError) => {
                expect(err.code).to.equal("ERR_BAD_REQUEST");
            });
    });
});
