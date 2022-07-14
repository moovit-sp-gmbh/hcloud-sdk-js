import hcloud from "../../src/lib/hcloud";
import { expect } from "chai";
import { AxiosError, AxiosResponse } from "axios";
import { User, Token } from "../../src/lib/interfaces/IDP";
import { AuditLog, Level, Origin, Type, Event } from "../../src/lib/interfaces/Auditor";
import { Version, ErrorMessage } from "../../src/lib/interfaces/Global";
import { v4 as uuidv4 } from "uuid";
import { Template } from "../../src/lib/interfaces/Mail";

describe("Mailer", () => {
    const hcloudClient = new hcloud({ api: "https://dev.app.helmut.cloud" });
    let token = "";

    it("Version OK", () => {
        return hcloudClient.Mailer.version()
            .then((resp: Version) => {
                expect(resp.version).to.be.a.string;
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

    it.skip("SendMailTemplate OK", () => {
        return hcloudClient.Mailer.interal
            .sendMailTemplate({
                recipients: ["svyxv3s4pb2vufqz@ethereal.email"],
                template: Template.REGISTER,
                replacements: [],
                subject: "test subject",
            })
            .catch((err: AxiosError) => {
                throw err;
            });
    });

    it.skip("SendMailHtml OK", () => {
        return hcloudClient.Mailer.interal
            .sendMailHtml({
                recipients: ["svyxv3s4pb2vufqz@ethereal.email"],
                html: "PGh0bWw+PGJvZHk+PHByZT5tb288L3ByZT48L2JvZHk+PC9odG1sPg==",
                subject: "test subject",
            })
            .catch((err: AxiosError) => {
                throw err;
            });
    });

    it.skip("SendMailMustache OK", () => {
        return hcloudClient.Mailer.interal
            .sendMailMustache({
                recipients: ["svyxv3s4pb2vufqz@ethereal.email"],
                html: "PGh0bWw+PGhlYWQ+PHRpdGxlPnt7dGl0bGV9fTwvdGl0bGU+PC9oZWFkPjxib2R5PjxwcmU+bW9vPC9wcmU+PC9ib2R5PjwvaHRtbD4=",
                subject: "test subject",
                replacements: [{ key: "title", value: "a cool title" }],
            })
            .catch((err: AxiosError) => {
                throw err;
            });
    });
});
