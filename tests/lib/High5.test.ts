import hcloud from "../../src/lib/hcloud";
import { expect } from "chai";
import { AxiosError, AxiosResponse } from "axios";
import { User, SuccessfulAuth } from "../../src/lib/interfaces/IDP";
import { Version, ErrorMessage } from "../../src/lib/interfaces/Global";
import { v4 as uuidv4 } from "uuid";
import { App, AppPermission, Design, Event, Stream } from "../../src/lib/interfaces/High5";
import { doesNotMatch } from "assert";

describe("High5", () => {
    const hcloudClient = new hcloud({ api: "https://dev.app.helmut.cloud" });
    let token = "";
    let user: User;
    let app: App;
    let event: Event;
    let stream: Stream;
    let design: Design;

    it("Version OK", () => {
        return hcloudClient.Auditor.version()
            .then((resp: Version) => {
                expect(resp.version).to.be.a.string;
            })
            .catch((err: AxiosError) => {
                throw err;
            });
    });

    it("Authenticate OK", () => {
        return hcloudClient.IDP.authenticate("s.siebertz@moovit-sp.com", "Sev2000Sev")
            .then((resp: SuccessfulAuth) => {
                expect(resp.token).to.contain("Bearer ");
                user = resp.user;
                token = resp.token;
                hcloudClient.setAuthToken(resp.token);
            })
            .catch((err: AxiosError) => {
                throw err;
            });
    });

    describe("App", () => {
        it("Create app OK", () => {
            const appName = "test" + uuidv4().substr(0, 20);
            return hcloudClient.High5.app
                .createApp(appName)
                .then((resp: App) => {
                    expect(resp.name).to.equal(appName);
                    app = resp;
                })
                .catch((err: AxiosError) => {
                    console.log(err);
                    throw err;
                });
        });

        it("Get app by ID OK", () => {
            return hcloudClient.High5.app
                .getAppById(app._id)
                .then((resp: App) => {
                    expect(resp.name).to.equal(app.name);
                    app = resp;
                })
                .catch((err: AxiosError) => {
                    throw err;
                });
        });

        it("GetApps OK", () => {
            return hcloudClient.High5.app
                .getApps()
                .then((resp: App[]) => {
                    expect(resp.length).to.be.greaterThanOrEqual(1);
                })
                .catch((err: AxiosError) => {
                    throw err;
                });
        });

        it("Patch App Permission OK", () => {
            return hcloudClient.High5.app
                .patchAppPermission(app._id, user._id, AppPermission.OWNER)
                .then((resp: App) => {
                    expect(resp.permissions[0].permission).to.equal(AppPermission.OWNER);
                })
                .catch((err: AxiosError) => {
                    throw err;
                });
        });

        it("Delete app by ID OK", () => {
            return hcloudClient.High5.app
                .deleteAppById(app._id)
                .then((resp: any) => {
                    expect(resp).to.equal(undefined);
                })
                .catch((err: AxiosError) => {
                    throw err;
                });
        });
    });

    describe("Event", () => {
        it("Create app OK", () => {
            const appName = "test-events-" + uuidv4().substr(0, 20);
            return hcloudClient.High5.app
                .createApp(appName)
                .then((resp: App) => {
                    expect(resp.name).to.equal(appName);
                    app = resp;
                })
                .catch((err: AxiosError) => {
                    throw err;
                });
        });

        it("Create event OK", () => {
            const eventName = "test." + makeid(20);
            return hcloudClient.High5.event
                .createEvent(app._id, eventName)
                .then((resp: Event) => {
                    expect(resp.name).to.equal(eventName);
                    event = resp;
                })
                .catch((err: AxiosError) => {
                    throw err;
                });
        });

        it("Get events OK", () => {
            return hcloudClient.High5.event
                .getEvents(app._id)
                .then((resp: Event[]) => {
                    expect(resp.length).to.equal(1);
                })
                .catch((err: AxiosError) => {
                    throw err;
                });
        });

        it("Get event by ID OK", () => {
            return hcloudClient.High5.event
                .getEventById(event._id)
                .then((resp: Event) => {
                    expect(resp._id).to.equal(event._id);
                })
                .catch((err: AxiosError) => {
                    throw err;
                });
        });

        it("Delete event by ID OK", () => {
            return hcloudClient.High5.event
                .deleteEventById(event._id)
                .then((resp: any) => {
                    expect(resp).to.equal(undefined);
                })
                .catch((err: AxiosError) => {
                    throw err;
                });
        });
    });

    describe("Stream", () => {
        it("Create app OK", () => {
            const appName = "test-events-" + uuidv4().substr(0, 20);
            return hcloudClient.High5.app
                .createApp(appName)
                .then((resp: App) => {
                    expect(resp.name).to.equal(appName);
                    app = resp;
                })
                .catch((err: AxiosError) => {
                    throw err;
                });
        });

        it("Create event OK", () => {
            const eventName = "test." + makeid(20);
            return hcloudClient.High5.event
                .createEvent(app._id, eventName)
                .then((resp: Event) => {
                    expect(resp.name).to.equal(eventName);
                    event = resp;
                })
                .catch((err: AxiosError) => {
                    throw err;
                });
        });

        it("Create stream OK", () => {
            const streamName = "test";
            return hcloudClient.High5.stream
                .createStream(event._id, streamName)
                .then((resp: Stream) => {
                    expect(resp.name).to.equal(streamName);
                    stream = resp;
                })
                .catch((err: AxiosError) => {
                    console.log(err);
                    throw err;
                });
        });

        it("Get streams OK", () => {
            return hcloudClient.High5.stream
                .getStreams(event._id)
                .then((resp: Stream[]) => {
                    expect(resp.length).to.equal(1);
                })
                .catch((err: AxiosError) => {
                    throw err;
                });
        });

        it("Get stream by ID OK", () => {
            return hcloudClient.High5.stream
                .getStreamById(stream._id)
                .then((resp: Stream) => {
                    expect(resp._id).to.equal(stream._id);
                })
                .catch((err: AxiosError) => {
                    throw err;
                });
        });

        it("Delete stream by ID OK", () => {
            return hcloudClient.High5.stream
                .deleteStreamById(stream._id)
                .then((resp: any) => {
                    expect(resp).to.equal(undefined);
                })
                .catch((err: AxiosError) => {
                    throw err;
                });
        });
    });

    describe("Design", () => {
        it("Create app OK", () => {
            const appName = "test-events-" + uuidv4().substr(0, 20);
            return hcloudClient.High5.app
                .createApp(appName)
                .then((resp: App) => {
                    expect(resp.name).to.equal(appName);
                    app = resp;
                })
                .catch((err: AxiosError) => {
                    throw err;
                });
        });

        it("Create event OK", () => {
            const eventName = "test." + makeid(20);
            return hcloudClient.High5.event
                .createEvent(app._id, eventName)
                .then((resp: Event) => {
                    expect(resp.name).to.equal(eventName);
                    event = resp;
                })
                .catch((err: AxiosError) => {
                    throw err;
                });
        });

        it("Create stream OK", () => {
            const streamName = "test";
            return hcloudClient.High5.stream
                .createStream(event._id, streamName)
                .then((resp: Stream) => {
                    expect(resp.name).to.equal(streamName);
                    stream = resp;
                })
                .catch((err: AxiosError) => {
                    throw err;
                });
        });

        it("Create design OK", () => {
            const designName = "test";
            return hcloudClient.High5.design
                .createDesign(stream._id, designName, { foo: "bar" })
                .then((resp: Design) => {
                    expect(resp.name).to.equal(designName );
                    design = resp;
                })
                .catch((err: AxiosError) => {
                    throw err;
                });
        });

        it("Get designs OK", () => {
            return hcloudClient.High5.design
                .getDesigns(stream._id)
                .then((resp: Design[]) => {
                    expect(resp.length).to.equal(1);
                })
                .catch((err: AxiosError) => {
                    throw err;
                });
        });

        it("Get design by ID OK", () => {
            return hcloudClient.High5.design
                .getDesignById(design._id)
                .then((resp: Design) => {
                    expect(resp._id).to.equal(design._id);
                })
                .catch((err: AxiosError) => {
                    throw err;
                });
        });
    });
});

function makeid(length: number) {
    var result = "";
    var characters = "abcdefghijklmnopqrstuvwxyz.";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
