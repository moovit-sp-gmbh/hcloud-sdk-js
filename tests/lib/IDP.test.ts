import hcloud from "../../src/lib/hcloud";
import { expect } from "chai";
import { AxiosError, AxiosResponse } from "axios";
import { User, Token } from "../../src/lib/interfaces/IDP";
import { Version, ErrorMessage } from "../../src/lib/interfaces/Global";
import { v4 as uuidv4 } from "uuid";
import { resolve } from "path/posix";
import { doesNotMatch, rejects } from "assert";

describe("IDP", function () {
    this.timeout(10000);
    const hcloudClient = new hcloud({ api: "https://dev.app.helmut.cloud" });
    let token = "";

    it("Version OK", done => {
        hcloudClient.IDP.version()
            .then((resp: Version) => {
                expect(resp.version).to.be.a.string;
                done();
            })
            .catch((err: AxiosError) => {
                throw err;
            });
    });

    it("Register OK", done => {
        const name = `Severin Siebertz ${uuidv4()}`;
        hcloudClient.IDP.register(name, `s.siebertz@moovit-sp-${uuidv4()}.com`, "Sev2000Sev")
            .then((resp: User) => {
                expect(resp.name).to.equal(name);
                done();
            })
            .catch((err: AxiosError) => {
                throw err;
            });
    });

    it("Register ERR", done => {
        hcloudClient.IDP.register("Severin Siebertz", "s.siebertz@moovit-sp.com", "Sev2000Sev").catch((err: AxiosError) => {
            const resp = err.response?.data as ErrorMessage;
            expect(resp.code).to.equal("001.002.0001");
            expect(resp.error).to.equal("user.already.exists");
            done();
        });
    });

    it("Authenticate OK", done => {
        hcloudClient.IDP.authenticate("s.siebertz@moovit-sp.com", "Sev2000Sev")
            .then((resp: Token) => {
                expect(resp.token).to.contain("Bearer ");
                token = resp.token;
                done();
            })
            .catch((err: AxiosError) => {
                throw err;
            });
    });

    it("Authenticate ERR", done => {
        hcloudClient.IDP.authenticate("s.siebertz@moovit-sp.com", "Sev2001Sev").catch((err: AxiosError) => {
            const resp = err.response?.data as ErrorMessage;
            expect(resp.code).to.equal("001.001.0002");
            expect(resp.error).to.equal("unauthorized");
            done();
        });
    });

    it("AuthenticateReturnUser OK", done => {
        hcloudClient.IDP.authenticateReturnUser("s.siebertz@moovit-sp.com", "Sev2000Sev")
            .then((resp: User) => {
                expect(resp.name).to.equal("Severin Siebertz");
                done();
            })
            .catch((err: AxiosError) => {
                throw err;
            });
    });

    it("AuthenticateReturnUser ERR", done => {
        hcloudClient.IDP.authenticateReturnUser("s.siebertz@moovit-sp.com", "Sev2001Sev").catch((err: AxiosError) => {
            const resp = err.response?.data as ErrorMessage;
            expect(resp.code).to.equal("001.001.0002");
            expect(resp.error).to.equal("unauthorized");
            done();
        });
    });
});
