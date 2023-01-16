import { AxiosError } from "axios";
import { expect } from "chai";
import { v4 as uuidv4 } from "uuid";
import hcloud from "../../../src/lib/hcloud";
import { ErrorMessage, Version } from "../../../src/lib/interfaces/Global";
import { Organization, OrganizationMember, OrganizationPermission, SuccessfulAuth, User } from "../../../src/lib/interfaces/IDP";

describe.skip("IDP", function () {
    this.timeout(10000);
    const hcloudClient = new hcloud({ server: "https://dev.app.helmut.cloud" });
    let token = "";
    let user = {} as User;
    const userPassword = "Sev2000Sev!";
    let userToBeDeleted = {} as User;

    it.skip("Version OK", done => {
        hcloudClient.IDP.version()
            .then((resp: Version) => {
                expect(resp.version).to.be.a("string");
                done();
            })
            .catch((err: AxiosError) => {
                throw err;
            });
    });

    describe.skip("Register", () => {
        it.skip("Register OK", done => {
            const name = `Severin Siebertz ${uuidv4()}`;
            hcloudClient.IDP.registration
                .register(name, `s.siebertz-${uuidv4()}@moovit-sp.com`, userPassword)
                .then((resp: User) => {
                    expect(resp.name).to.equal(name);
                    userToBeDeleted = resp;
                    done();
                })
                .catch((err: AxiosError) => {
                    throw err;
                });
        });

        it.skip("Register", done => {
            hcloudClient.IDP.registration
                .register("Severin Siebertz", "s.siebertz@moovit-sp.com", "Sev2000Sev!")
                .then((resp: User) => {
                    done();
                })
                .catch((err: AxiosError) => {
                    done();
                });
        });

        it.skip("Register ERR", done => {
            hcloudClient.IDP.registration.register("Severin Siebertz", "s.siebertz@moovit-sp.com", "Sev2000Sev!").catch((err: AxiosError) => {
                const resp = err.response?.data as ErrorMessage;
                expect(resp.code).to.equal("001.002.0001");
                expect(resp.error).to.equal("user.already.exists");
                done();
            });
        });
    });

    describe.skip("Authenticate", () => {
        it.skip("Authenticate OK", done => {
            hcloudClient.IDP.authenticate("s.siebertz@moovit-sp.com", "Sev2000Sev!")
                .then((resp: SuccessfulAuth) => {
                    expect(resp.token).to.contain("Bearer ");
                    expect(resp.user.email).to.equal("s.siebertz@moovit-sp.com");
                    user = resp.user;
                    token = resp.token;
                    hcloudClient.setAuthToken(resp.token);
                    done();
                })
                .catch((err: AxiosError) => {
                    throw err;
                });
        });

        it.skip("Authenticate ERR", done => {
            hcloudClient.IDP.authenticate("s.siebertz@moovit-sp.com", "Sev2001Sev").catch((err: AxiosError) => {
                const resp = err.response?.data as ErrorMessage;
                expect(resp.code).to.equal("001.001.0002");
                expect(resp.error).to.equal("unauthorized");
                done();
            });
        });

        it.skip("should authorize user and show user org as the active org", done => {
            hcloudClient.IDP.authorize()
                .then((resp: User) => {
                    expect(resp._id).to.equal(user._id);
                    expect(resp.name).to.equal(user.name);
                    expect(resp.email).to.equal(user.email);
                    expect(resp.activeOrganizationId).to.equal(user.activeOrganizationId);
                    done();
                })
                .catch((err: AxiosError) => {
                    throw err;
                });
        });
    });

    describe.skip("Organization & OrganizationMember", () => {
        let organization = {} as Organization;

        // Create test user to add as a member to the organization
        let newOrgMemberUser = {} as User;
        const newOrgMemberUuid = uuidv4();
        const newOrgMemberPassword = "Tester2000!";

        it.skip("creates the newOrgMember", done => {
            hcloudClient.IDP.registration
                .register(`tester_${newOrgMemberUuid}`, `t.ester@${newOrgMemberUuid}-moovit-sp.com`, newOrgMemberPassword)
                .then((resp: User) => {
                    newOrgMemberUser = resp;
                    done();
                })
                .catch((err: AxiosError) => {
                    throw err;
                });
        });

        it.skip("creates an organization", done => {
            hcloudClient.IDP.organization
                .createOrganization(uuidv4())
                .then((resp: Organization) => {
                    expect(resp).to.have.property("_id");
                    organization = resp;
                    done();
                })
                .catch((err: AxiosError) => {
                    throw err;
                });
        });

        it.skip("gets the organization by id", done => {
            hcloudClient.IDP.organization
                .getOrganizationById(organization._id)
                .then((resp: Organization) => {
                    expect(resp).to.have.property("_id");
                    expect(resp._id).to.equal(organization._id);
                    done();
                })
                .catch((err: AxiosError) => {
                    throw err;
                });
        });

        it.skip("updates the organization name", done => {
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

        it.skip("organizationUpdateWithCompany OK", done => {
            hcloudClient.IDP.organization
                .updateOrganization(organization._id, uuidv4(), "moo")
                .then((resp: Organization) => {
                    expect(resp.company).to.equal("moo");
                    organization = resp;
                    done();
                })
                .catch((err: AxiosError) => {
                    throw err;
                });
        });

        it.skip("adds a member to the organization", done => {
            hcloudClient.IDP.organization.member
                .addOrganizationMember(organization._id, {
                    email: newOrgMemberUser.email,
                    permission: OrganizationPermission.READ,
                })
                .then((resp: OrganizationMember) => {
                    expect(resp).to.have.property("_id");
                    done();
                })
                .catch((err: AxiosError) => {
                    throw err;
                });
        });

        it.skip("fails to add a user that already is a member to the organization", done => {
            hcloudClient.IDP.organization.member
                .addOrganizationMember(organization._id, { email: user.email, permission: OrganizationPermission.READ })
                .catch((err: AxiosError) => {
                    const resp = err.response?.data as ErrorMessage;
                    expect(resp.code).to.equal("001.004.0002");
                    expect(resp.error).to.equal("user.already.member");
                    done();
                });
        });

        it.skip("OrganizationList OK", done => {
            hcloudClient.IDP.organization
                .listOrganizations()
                .then((resp: [Organization[], number]) => {
                    expect(resp[0].length).to.be.greaterThanOrEqual(2);
                    expect(resp[0][0]._id).to.not.equal(organization._id);
                    expect(resp[0][resp.length - 1]._id).to.equal(organization._id);
                    done();
                })
                .catch((err: AxiosError) => {
                    throw err;
                });
        });

        it.skip("organizationMemberGetById OK", done => {
            hcloudClient.IDP.organization.member
                .listOrganizationMembers(organization._id)
                .then((resp: [OrganizationMember[], number]) => {
                    expect(resp[0].length).to.be.greaterThanOrEqual(1);
                    done();
                })
                .catch((err: AxiosError) => {
                    throw err;
                });
        });

        it.skip("member with read permission fails to update organization", done => {
            hcloudClient.IDP.authenticate(newOrgMemberUser.email, newOrgMemberPassword)
                .then((resp: SuccessfulAuth) => {
                    token = resp.token;
                    hcloudClient.setAuthToken(resp.token);

                    hcloudClient.IDP.organization
                        .updateOrganization(organization._id, "new org name")
                        .catch((err: AxiosError) => {
                            const respErr = err.response?.data as ErrorMessage;
                            expect(respErr.code).to.equal("001.003.0003");
                            expect(respErr.error).to.equal("organization.insufficient.permission");
                        })
                        .then(() => {
                            hcloudClient.IDP.authenticate(user.email, userPassword)
                                .then((respAuth: SuccessfulAuth) => {
                                    token = respAuth.token;
                                    hcloudClient.setAuthToken(respAuth.token);
                                    done();
                                })
                                .catch((err: AxiosError) => {
                                    throw err;
                                });
                        });
                })
                .catch((err: AxiosError) => {
                    throw err;
                });
        });

        it.skip("patches the member's permission", done => {
            hcloudClient.IDP.organization.member
                .patchOrganizationMemberPermission(organization._id, {
                    patchUserId: newOrgMemberUser._id,
                    permission: OrganizationPermission.ADMIN,
                })
                .then((resp: OrganizationMember) => {
                    expect(resp).to.have.property("permission");
                    expect(resp.permission).to.equal("ADMIN");
                    done();
                })
                .catch((err: AxiosError) => {
                    throw err;
                });
        });

        it.skip("member with admin permission updates organization", done => {
            const newOrgName = `new org name ${uuidv4()}`;

            hcloudClient.IDP.authenticate(newOrgMemberUser.email, newOrgMemberPassword)
                .then((resp: SuccessfulAuth) => {
                    token = resp.token;
                    hcloudClient.setAuthToken(resp.token);

                    hcloudClient.IDP.organization
                        .updateOrganization(organization._id, newOrgName)
                        .then((respOrg: Organization) => {
                            expect(respOrg).to.have.property("name");
                            expect(respOrg.name).to.equal(newOrgName);

                            hcloudClient.IDP.authenticate(user.email, userPassword)
                                .then((respAuth: SuccessfulAuth) => {
                                    token = respAuth.token;
                                    hcloudClient.setAuthToken(respAuth.token);
                                    done();
                                })
                                .catch((err: AxiosError) => {
                                    throw err;
                                });
                        })
                        .catch((err: AxiosError) => {
                            throw err;
                        });
                })
                .catch((err: AxiosError) => {
                    throw err;
                });
        });

        it.skip("deletes the org member", done => {
            hcloudClient.IDP.organization.member
                .removeOrganizationMember(organization._id, newOrgMemberUser._id)
                .then((resp: any) => {
                    expect(resp).to.equal(undefined);
                    done();
                })
                .catch((err: AxiosError) => {
                    throw err;
                });
        });

        it.skip("fails do delete the already deleted org member", done => {
            hcloudClient.IDP.organization.member.removeOrganizationMember(organization._id, newOrgMemberUser._id).catch((err: AxiosError) => {
                // console.log(err.response?.data);
                const resp = err.response?.data as ErrorMessage;
                expect(resp.code).to.equal("001.004.0001");
                expect(resp.error).to.equal("missing.member");
                done();
            });
        });

        it.skip("deletes the organization", done => {
            hcloudClient.IDP.organization
                .deleteOrganizationById(organization._id)
                .then(() => {
                    done();
                })
                .catch((err: AxiosError) => {
                    throw err;
                });
        });

        it.skip("fails to delete the already deleted organization", done => {
            hcloudClient.IDP.organization.deleteOrganizationById(organization._id).catch((err: AxiosError) => {
                const resp = err.response?.data as ErrorMessage;
                expect(resp.code).to.equal("001.003.0003");
                expect(resp.error).to.equal("organization.insufficient.permission");
                done();
            });
        });
    });

    describe.skip("User", () => {
        it.skip("Authenticate OK", done => {
            hcloudClient.IDP.authenticate(userToBeDeleted.email, "Sev2000Sev!")
                .then((resp: SuccessfulAuth) => {
                    expect(resp.token).to.contain("Bearer ");
                    token = resp.token;
                    hcloudClient.setAuthToken(resp.token);
                    done();
                })
                .catch((err: AxiosError) => {
                    throw err;
                });
        });

        it.skip("UserPatch OK", done => {
            const newName = "New_name_" + uuidv4();
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

        it.skip("UserDelete ERR", done => {
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
