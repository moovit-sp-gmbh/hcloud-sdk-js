import { AxiosError } from "axios";
import { expect } from "chai";
import { v4 as uuidv4 } from "uuid";
import hcloud from "../../src/lib/hcloud";
import { ErrorMessage } from "../../src/lib/interfaces/Global";
import { Organization, OrganizationMember, OrganizationPermission, User } from "../../src/lib/interfaces/IDP";
import {
    constantTestOrgMemberUser,
    constantTestUser,
    getTestOrganization,
    getTestOrgMemberUserHcloudClient,
    getTestUserHcloudClient,
} from "./helper/testHelper";

describe("IDP", async function () {
    let hcloudClient: hcloud = await getTestUserHcloudClient();
    let organizationForMemberTest: Organization = await getTestOrganization(hcloudClient);
    let orgMemberHcloudClient: hcloud = await getTestOrgMemberUserHcloudClient();

    describe("Organizations & Members", function () {
        this.timeout(2500);

        beforeEach(async () => {
            await new Promise(resolve => setTimeout(resolve, 100));
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
            // Why doesn't this work without re-setting the token?
            beforeEach(async () => {
                hcloudClient.setAuthToken(hcloudClient.testToken);
            });

            it("adds a member to the organization", done => {
                hcloudClient.IDP.organization.member
                    .addOrganizationMember(organizationForMemberTest._id, {
                        email: constantTestOrgMemberUser.email,
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
                    .addOrganizationMember(organizationForMemberTest._id, { email: constantTestOrgMemberUser.email, permission: OrganizationPermission.READ })
                    .catch((err: AxiosError) => {
                        // console.log(err.response?.data);
                        // console.log(err);
                        const resp = err.response?.data as ErrorMessage;
                        expect(resp.code).to.equal("001.004.0002");
                        expect(resp.error).to.equal("user.already.member");
                        done();
                    });
            });

            it("organizationMemberGetById OK", done => {
                hcloudClient.IDP.organization.member
                    .listOrganizationMembers(organizationForMemberTest._id)
                    .then((resp: OrganizationMember[]) => {
                        expect(resp.length).to.be.greaterThanOrEqual(1);
                        done();
                    })
                    .catch((err: AxiosError) => {
                        throw err;
                    });
            });

            it("fails to update organization for member with read permission", done => {
                orgMemberHcloudClient.setAuthToken(orgMemberHcloudClient.testToken); // No clue why this is needed
                
                orgMemberHcloudClient.IDP.organization
                    .updateOrganization(organizationForMemberTest._id, "new_organization_name_" + uuidv4())
                    .catch((err: AxiosError) => {
                        const resp = err.response?.data as ErrorMessage;
                        expect(resp.code).to.equal("001.003.0003");
                        expect(resp.error).to.equal("organization.insufficient.permission");
                        done();
                    });
            });

            it("patches the member's permission", done => {
                hcloudClient.IDP.organization.member
                    .patchOrganizationMemberPermission(organizationForMemberTest._id, {
                        patchUserId: constantTestOrgMemberUser._id,
                        permission: OrganizationPermission.ADMIN,
                    })
                    .then((resp: OrganizationMember) => {
                        expect(resp).to.have.property("permission");
                        expect(resp.permission).to.equal("ADMIN");
                        done();
                    })
                    .catch((err: AxiosError) => {
                        console.log(err);
                        console.log(err.response?.data);
                        throw err;
                    });
            });

            it("member with admin permission updates organization", done => {
                const newOrgName = `new org name ${uuidv4()}`;
                orgMemberHcloudClient.IDP.organization
                    .updateOrganization(organizationForMemberTest._id, newOrgName)
                    .then((resp: Organization) => {
                        expect(resp).to.have.property("name");
                        expect(resp.name).to.equal(newOrgName);
                        done();
                    })
                    .catch((err: AxiosError) => {
                        throw err;
                    });
            });

            it("deletes the org member", done => {
                hcloudClient.IDP.organization.member
                    .removeOrganizationMember(organizationForMemberTest._id, constantTestOrgMemberUser._id)
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
                hcloudClient.IDP.organization.member
                    .removeOrganizationMember(organizationForMemberTest._id, constantTestOrgMemberUser._id)
                    .catch((err: AxiosError) => {
                        // console.log(err.response?.data);
                        const resp = err.response?.data as ErrorMessage;
                        expect(resp.code).to.equal("001.004.0001");
                        expect(resp.error).to.equal("missing.member");
                        done();
                    });
            });
        });
    });
});
