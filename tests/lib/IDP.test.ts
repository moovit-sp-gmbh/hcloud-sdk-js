import hcloud from "../../src/lib/hcloud";
import { expect } from "chai";
import { AxiosError, AxiosResponse } from "axios";
import { User, SuccessfulAuth, Organization, OrganizationMember, OrganizationMemberRole } from "../../src/lib/interfaces/IDP";
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

        it("Register", done => {
            hcloudClient.IDP.register("Severin Siebertz", "s.siebertz@moovit-sp.com", "Sev2000Sev")
                .then((resp: User) => {
                    done();
                })
                .catch((err: AxiosError) => {
                    done();
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
                .then((resp: SuccessfulAuth) => {
                    expect(resp.token).to.contain("Bearer ");
                    expect(resp.user.email).to.equal("s.siebertz@moovit-sp.com");
                    user = resp.user;
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

        it("OrganizationUpdate OK", done => {
            const newName = uuidv4();
            hcloudClient.IDP.organization
                .updateOrganization(organization[0]._id, newName)
                .then((resp: Organization) => {
                    expect(resp).to.have.property("_id");
                    expect(resp.name).to.equal(newName);
                    organization.push(resp);
                    done();
                })
                .catch((err: AxiosError) => {
                    throw err;
                });
        });

        it("OrganizationUpdateWithCompany OK", done => {
            hcloudClient.IDP.organization
                .updateOrganization(organization[0]._id, uuidv4(), "moo")
                .then((resp: Organization) => {
                    expect(resp.company).to.equal("moo");
                    organization.push(resp);
                    done();
                })
                .catch((err: AxiosError) => {
                    throw err;
                });
        });

        it("OrganizationAddMemberByEmail OK", done => {
            hcloudClient.IDP.organization.member
                .addOrganizationMemberByEmail(organization[0]._id, user.email, OrganizationMemberRole.MAINTAINER)
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
                .removeOrganizationMemberById(organization[1]._id, user._id)
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

    describe("User", function () {
        it("UserPatch OK", done => {
            const newName = "Severin Siebertz " + uuidv4();
            hcloudClient.IDP.user
                .patchUser({ name: newName })
                .then((resp: User) => {
                    expect(resp.name).to.equal(newName);
                    done();
                })
                .catch((err: AxiosError) => {
                    throw err;
                });
        });

        it("UserDelete ERR", done => {
            hcloudClient.IDP.user
                .deleteUser()
                .then(() => {
                    done();
                })
                .catch((err: AxiosError) => {
                    throw err;
                });
        });
    });
});
