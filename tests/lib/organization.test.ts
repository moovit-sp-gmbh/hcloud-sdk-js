import { AxiosError } from "axios";
import { expect } from "chai";
import { v4 as uuidv4 } from "uuid";
import hcloud from "../../src/lib/hcloud";
import { ErrorMessage } from "../../src/lib/interfaces/Global";
import { Organization, OrganizationMember, OrganizationPermission } from "../../src/lib/interfaces/IDP";

describe("IDP", function () {
    describe.only("Organizations & Members", function () {
        this.timeout(5000);

        const userOrgOwner = {
            _id: "630495248232cd58e559170e",
            name: "Test_Constant_User",
            email: "test.user@msp.com",
            password: "Test123!",
        };

        const userOrgMember = {
            _id: "6304c4828232cd58e559b2d9",
            name: "Test_Constant_Org_Member_User",
            email: "test.orgMemberUser@msp.com",
            password: "Test123!",
        };

        const testOrganization = {
            _id: "630dbf791d9abb46f30f7050",
            name: "Constant_Test_Organization",
            company: "Test_Company",
        };

        const hcloudClient = new hcloud({ api: "https://dev.app.helmut.cloud" });

        it("logs in as organization owner", done => {
            hcloudClient.IDP.authenticate(userOrgOwner.email, userOrgOwner.password)
                .then(token => {
                    hcloudClient.setAuthToken(token.token);
                    done();
                })
                .catch((err: AxiosError) => {
                    console.log(err);
                    console.log(err.response?.data);
                    throw err;
                });
        });

        describe("Organization", function () {
            let organization = {} as Organization;

            it("creates an organization", done => {
                hcloudClient.IDP.organization
                    .createOrganization(uuidv4() + "_Test_Organization")
                    .then((resp: Organization) => {
                        expect(resp).to.have.property("_id");
                        organization = resp;
                        done();
                    })
                    .catch((err: AxiosError) => {
                        console.log(err.response?.data);
                        throw err;
                    });
            });

            it("gets the organization by id", done => {
                hcloudClient.IDP.organization
                    .getOrganizationById(organization._id)
                    .then((resp: Organization) => {
                        expect(resp).to.have.property("_id");
                        expect(resp._id).to.equal(organization._id);
                        done();
                    })
                    .catch((err: AxiosError) => {
                        console.log(err.response?.data);
                        throw err;
                    });
            });

            it("updates the organization name", done => {
                const newName = uuidv4();
                hcloudClient.IDP.organization
                    .updateOrganization(organization._id, newName)
                    .then((resp: Organization) => {
                        expect(resp).to.have.property("_id");
                        expect(resp.name).to.equal(newName);
                        organization = resp;
                        done();
                    })
                    .catch((err: AxiosError) => {
                        throw err;
                    });
            });

            it("organizationUpdateWithCompany OK", done => {
                hcloudClient.IDP.organization
                    .updateOrganization(organization._id, uuidv4(), "moo")
                    .then((resp: Organization) => {
                        expect(resp.company).to.equal("moo");
                        organization = resp;
                        done();
                    })
                    .catch((err: AxiosError) => {
                        console.log(err);
                        throw err;
                    });
            });

            it("deletes the organization", done => {
                setTimeout(() => {
                    hcloudClient.IDP.organization
                        .deleteOrganizationById(organization._id)
                        .then(() => {
                            done();
                        })
                        .catch((err: AxiosError) => {
                            throw err;
                        });
                }, 1000);
            });

            it("fails to delete the already deleted organization", done => {
                hcloudClient.IDP.organization.deleteOrganizationById(organization._id).catch((err: AxiosError) => {
                    const resp = err.response?.data as ErrorMessage;
                    expect(resp.code).to.equal("001.003.0002");
                    expect(resp.error).to.equal("missing.organization");
                    done();
                });
            });
        });

        describe("OrganizationMember", function () {
            it("adds a member to the organization", done => {
                hcloudClient.IDP.organization.member
                    .addOrganizationMember(testOrganization._id, {
                        email: userOrgMember.email,
                        permission: OrganizationPermission.READ,
                    })
                    .then((resp: OrganizationMember) => {
                        expect(resp).to.have.property("_id");
                        expect(resp.permission).to.equal("READ");
                        done();
                    })
                    .catch((err: AxiosError) => {
                        console.log(err.response?.data);
                        throw err;
                    });
            });

            it("fails to add a user that already is a member to the organization", done => {
                hcloudClient.IDP.organization.member
                    .addOrganizationMember(testOrganization._id, {
                        email: userOrgMember.email,
                        permission: OrganizationPermission.READ,
                    })
                    .catch((err: AxiosError) => {
                        const resp = err.response?.data as ErrorMessage;
                        expect(resp.code).to.equal("001.004.0002");
                        expect(resp.error).to.equal("user.already.member");
                        done();
                    });
            });

            it("organizationMemberGetById OK", done => {
                hcloudClient.IDP.organization.member
                    .listOrganizationMembers(testOrganization._id)
                    .then((resp: OrganizationMember[]) => {
                        expect(resp.length).to.be.greaterThanOrEqual(1);
                        done();
                    })
                    .catch((err: AxiosError) => {
                        throw err;
                    });
            });

            it("fails to update organization for member with read permission", done => {
                hcloudClient.IDP.authenticate(userOrgMember.email, userOrgMember.password)
                    .then(token => {
                        hcloudClient.setAuthToken(token.token);

                        hcloudClient.IDP.organization
                            .updateOrganization(testOrganization._id, "new_organization_name_" + uuidv4())
                            .catch((err: AxiosError) => {
                                const resp = err.response?.data as ErrorMessage;
                                expect(resp.code).to.equal("001.003.0003");
                                expect(resp.error).to.equal("organization.insufficient.permission");

                                hcloudClient.IDP.authenticate(userOrgOwner.email, userOrgOwner.password)
                                    .then(token => {
                                        hcloudClient.setAuthToken(token.token);
                                        done();
                                    })
                                    .catch((err: AxiosError) => {
                                        console.log(err);
                                        console.log(err.response?.data);
                                        throw err;
                                    });
                            });
                    })
                    .catch((err: AxiosError) => {
                        console.log(err);
                        console.log(err.response?.data);
                        throw err;
                    });
            });

            it("patches the member's permission", done => {
                hcloudClient.IDP.organization.member
                    .patchOrganizationMemberPermission(testOrganization._id, {
                        patchUserId: userOrgMember._id,
                        permission: OrganizationPermission.ADMIN,
                    })
                    .then((resp: OrganizationMember) => {
                        expect(resp).to.have.property("permission");
                        expect(resp.permission).to.equal("ADMIN");
                        done();
                    })
                    .catch((err: AxiosError) => {
                        console.log(err.response?.data);
                        throw err;
                    });
            });

            it("member with admin permission updates organization", done => {
                hcloudClient.IDP.authenticate(userOrgMember.email, userOrgMember.password)
                    .then(token => {
                        hcloudClient.setAuthToken(token.token);

                        const newOrgName = `new org name ${uuidv4()}`;
                        hcloudClient.IDP.organization
                            .updateOrganization(testOrganization._id, newOrgName)
                            .then((resp: Organization) => {
                                expect(resp).to.have.property("name");
                                expect(resp.name).to.equal(newOrgName);

                                hcloudClient.IDP.authenticate(userOrgOwner.email, userOrgOwner.password)
                                    .then(token => {
                                        hcloudClient.setAuthToken(token.token);
                                        done();
                                    })
                                    .catch((err: AxiosError) => {
                                        console.log(err);
                                        console.log(err.response?.data);
                                        throw err;
                                    });
                            })
                            .catch((err: AxiosError) => {
                                throw err;
                            });
                    })
                    .catch((err: AxiosError) => {
                        console.log(err);
                        console.log(err.response?.data);
                        throw err;
                    });
            });

            it("deletes the org member", done => {
                hcloudClient.IDP.organization.member
                    .removeOrganizationMember(testOrganization._id, userOrgMember._id)
                    .then((resp: any) => {
                        expect(resp).to.equal(undefined);
                        done();
                    })
                    .catch((err: AxiosError) => {
                        console.log(err.response?.data);
                        throw err;
                    });
            });

            it("fails do delete the already deleted org member", done => {
                hcloudClient.IDP.organization.member.removeOrganizationMember(testOrganization._id, userOrgMember._id).catch((err: AxiosError) => {
                    const resp = err.response?.data as ErrorMessage;
                    expect(resp.code).to.equal("001.004.0001");
                    expect(resp.error).to.equal("missing.member");
                    done();
                });
            });
        });
    });
});
