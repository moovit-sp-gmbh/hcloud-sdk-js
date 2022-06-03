import hcloud from "../../src/lib/hcloud";
import { expect } from "chai";
import { AxiosError, AxiosResponse } from "axios";
import { User, Token, ErrorMessage } from "../../src/lib/dto/IDP";
import { v4 as uuidv4 } from "uuid";

describe("IDP", () => {
    const h = new hcloud({ api: "https://dev.app.helmut.cloud" });
    let token = "";

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

    it("Register ERR", () => {
        return h.IDP.register("Severin Siebertz", "s.siebertz@moovit-sp.com", "Sev2000Sev").catch((err: AxiosError) => {
            const resp = err.response?.data as ErrorMessage;
            expect(resp.status).to.equal(409);
        });
    });

    it("Authenticate OK", () => {
        return h.IDP.authenticate("s.siebertz@moovit-sp.com", "Sev2000Sev")
            .then((resp: Token) => {
                expect(resp.token).to.contain("Bearer ");
                token = resp.token;
            })
            .catch((err: AxiosError) => {
                throw err;
            });
    });

    it("Authenticate ERR", () => {
        return h.IDP.authenticate("s.siebertz@moovit-sp.com", "Sev2001Sev").catch((err: AxiosError) => {
            const resp = err.response?.data as ErrorMessage;
            expect(resp.status).to.equal(403);
        });
    });

    it("AuthenticateReturnUser OK", () => {
        return h.IDP.authenticateReturnUser("s.siebertz@moovit-sp.com", "Sev2000Sev")
            .then((resp: User) => {
                expect(resp.name).to.equal("Severin Siebertz");
            })
            .catch((err: AxiosError) => {
                throw err;
            });
    });

    it("AuthenticateReturnUser ERR", () => {
        return h.IDP.authenticateReturnUser("s.siebertz@moovit-sp.com", "Sev2001Sev").catch((err: AxiosError) => {
            const resp = err.response?.data as ErrorMessage;
            expect(resp.status).to.equal(403);
        });
    });

    it("Authorize OK", () => {
        h.setAuthToken(token)
        return h.IDP.authorize()
            .then((resp: User) => {
                expect(resp.name).to.equal("Severin Siebertz");
            })
            .catch((err: AxiosError) => {
                throw err;
            });
    });
});
