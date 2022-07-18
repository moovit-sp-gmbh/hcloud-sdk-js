import hcloud from "../../src/lib/hcloud";
import { expect } from "chai";
import { AxiosError, AxiosResponse } from "axios";
import { User, Token, Organization, OrganizationMember, OrganizationMemberRole } from "../../src/lib/interfaces/IDP";
import { Version, ErrorMessage } from "../../src/lib/interfaces/Global";
import { v4 as uuidv4 } from "uuid";
import { resolve } from "path/posix";
import { doesNotMatch, rejects } from "assert";

describe("IDP", function () {
    this.timeout(10000);
    const hcloudClient = new hcloud({ api: "https://dev.app.helmut.cloud" });
    let token = "";
    let user = {} as User;
    let organization = [] as Organization[];

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

    describe("Register", function () {
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
    });

    describe("Authenticate", function () {
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
                    user = resp;
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

    describe("Organization & OrganizationMember", function () {
        it("OrganizationCreate OK", done => {
            hcloudClient.IDP.organization
                .createOrganization(uuidv4())
                .then((resp: Organization) => {
                    expect(resp).to.have.property("_id");
                    organization.push(resp);
                    done();
                })
                .catch((err: AxiosError) => {
                    throw err;
                });
        });

        it("OrganizationAddMemberByEmail OK", done => {
            hcloudClient.IDP.organization.member
                .addOrganizationMemberByEmail(organization[0]._id, "s.siebertz@moovit-sp.com", OrganizationMemberRole.MAINTINER)
                .then((resp: OrganizationMember) => {
                    expect(resp).to.have.property("_id");
                    done();
                })
                .catch((err: AxiosError) => {
                    throw err;
                });
        });

        it("OrganizationList OK", done => {
            hcloudClient.IDP.organization
                .listOrganizations()
                .then((resp: Organization[]) => {
                    expect(resp.length).to.be.greaterThanOrEqual(1);
                    organization.push(resp[0]);
                    done();
                })
                .catch((err: AxiosError) => {
                    throw err;
                });
        });

        it("OrganizationGetById OK", done => {
            hcloudClient.IDP.organization
                .getOrganizationById(organization[0]._id)
                .then((resp: Organization) => {
                    expect(resp).to.have.property("_id");
                    done();
                })
                .catch((err: AxiosError) => {
                    throw err;
                });
        });

        it("OrganizationMemberGetById OK", done => {
            hcloudClient.IDP.organization.member
                .listOrganizationMembersById(organization[1]._id)
                .then((resp: OrganizationMember[]) => {
                    expect(resp.length).to.be.greaterThanOrEqual(1);
                    done();
                })
                .catch((err: AxiosError) => {
                    throw err;
                });
        });

        it("OrganizationDeleteMemberById OK", done => {
            hcloudClient.IDP.organization.member
                .removeOrganizationMemberById(organization[0]._id, user._id)
                .then(() => {
                    done();
                })
                .catch((err: AxiosError) => {
                    throw err;
                });
        });

        it("OrganizationDeleteMemberById ERR", done => {
            hcloudClient.IDP.organization.member.removeOrganizationMemberById(organization[0]._id, user._id).catch((err: AxiosError) => {
                const resp = err.response?.data as ErrorMessage;
                expect(resp.code).to.equal("001.004.0001");
                expect(resp.error).to.equal("missing.member");
                done();
            });
        });

        it("OrganizationDeleteById OK", done => {
            hcloudClient.IDP.organization
                .deleteOrganizationById(organization[0]._id)
                .then(() => {
                    done();
                })
                .catch((err: AxiosError) => {
                    throw err;
                });
        });
    });
});
