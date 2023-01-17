import { AxiosError } from "axios";
import { expect } from "chai";
import { v4 as uuidv4 } from "uuid";
import hcloud from "../../../src/lib/hcloud";
import { ErrorMessage, Version } from "../../../src/lib/interfaces/Global";
import { SuccessfulAuth, User } from "../../../src/lib/interfaces/IDP";

describe("IDP", function () {
    describe("User", function () {
        this.timeout(10000);
        const hcloudClient = new hcloud({ server: "https://dev.app.helmut.cloud" });
        let token = "";
        let user = {} as User;
        const userPassword = "Sev2000Sev!";
        let userToBeDeleted = {} as User;

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
            it("Register", done => {
                hcloudClient.IDP.registration
                    .register("Severin Siebertz", "s.siebertz@moovit-sp.com", "Sev2000Sev!", "no-captcha")
                    .then((resp: User) => {
                        done();
                    })
                    .catch((err: AxiosError) => {
                        done();
                    });
            });

            it("Register ERR", done => {
                hcloudClient.IDP.registration.register("Severin Siebertz", "s.siebertz@moovit-sp.com", "Sev2000Sev!", "no-captcha").catch((err: AxiosError) => {
                    const resp = err.response?.data as ErrorMessage;
                    expect(resp.code).to.equal("001.006.0002");
                    expect(resp.error).to.equal("registration.invalid.captcha");
                    done();
                });
            });
        });

        describe("Authenticate", function () {
            it("Authenticate OK", done => {
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

            it("Authenticate ERR", done => {
                hcloudClient.IDP.authenticate("s.siebertz@moovit-sp.com", "Sev2001Sev").catch((err: AxiosError) => {
                    const resp = err.response?.data as ErrorMessage;
                    expect(resp.code).to.equal("001.001.0002");
                    expect(resp.error).to.equal("unauthorized");
                    done();
                });
            });

            it("should authorize user and show user org as the active org", done => {
                hcloudClient.IDP.authorize()
                    .then((resp: User) => {
                        expect(resp._id).to.equal(user._id);
                        expect(resp.name).to.equal(user.name);
                        expect(resp.email).to.equal(user.email);
                        expect(resp.activeOrganizationId).to.equal(user.activeOrganizationId);
                        done();
                    })
                    .catch((err: AxiosError) => {
                        console.log(err.response?.data);
                        throw err;
                    });
            });
        });

        describe("User", function () {
            it("Authenticate OK", done => {
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

            it("UserPatch OK", done => {
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
});
