import hcloud from "../../../src/lib/hcloud";
import { expect } from "chai";
import { AxiosError } from "axios";
import { User, SuccessfulAuth } from "../../../src/lib/interfaces/IDP";
import { Version } from "../../../src/lib/interfaces/Global";
import { v4 as uuidv4 } from "uuid";
import { App, AppPermission, Design, Event, NodeCategory, Stream, Node } from "../../../src/lib/interfaces/High5";

describe("High5", function () {
    this.timeout(10000);
    const hcloudClient = new hcloud({ api: "https://dev.app.helmut.cloud" });
    let token = "";
    let user: User;
    let app: App;
    let event: Event;
    let stream: Stream;
    let design: Design;
    let node: Node;

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
        return hcloudClient.IDP.authenticate("s.siebertz@moovit-sp.com", "Sev2000Sev!")
            .then((resp: SuccessfulAuth) => {
                expect(resp.token).to.contain("Bearer ");
                user = resp.user;
                token = resp.token;
                hcloudClient.setAuthToken(resp.token);
            })
            .catch((err: AxiosError) => {
                console.log(err);

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

        it("Patch stream order OK", () => {
            return hcloudClient.High5.stream
                .patchStreamOrder(event._id, [{ streamId: stream._id, order: 1 }])
                .then((resp: Stream[]) => {
                    expect(resp[0].order).to.equal(1);
                    stream = resp[0];
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
                    expect(resp.name).to.equal(designName);
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

    describe("Node", () => {
        it("Create node OK", () => {
            const specification =
                "aW1wb3J0IHsKICBTdHJlYW1Ob2RlU3BlY2lmaWNhdGlvbiwKICBTdHJlYW1Ob2RlU3BlY2lmaWNhdGlvbkNhdGVnb3J5LAogIFN0cmVhbU5vZGVTcGVjaWZpY2F0aW9uSW5wdXRPdXRwdXRUeXBlLAogIFN0cmVhbU5vZGVTcGVjaWZpY2F0aW9uUGFja2FnZSwKICBTdHJlYW1Ob2RlU3BlY2lmaWNhdGlvblR5cGUsCn0gZnJvbSAiLi4vLi4vLi4vbW9kZWxzL1N0cmVhbU5vZGVTcGVjaWZpY2F0aW9uIjsKaW1wb3J0IEFjdGlvbk5vZGUgZnJvbSAiLi4vQWN0aW9uTm9kZSI7CgpleHBvcnQgZGVmYXVsdCBjbGFzcyBMb3dlckNhc2VBY3Rpb24gZXh0ZW5kcyBBY3Rpb25Ob2RlIHsKICBwcm90ZWN0ZWQgc3BlY2lmaWNhdGlvbjogU3RyZWFtTm9kZVNwZWNpZmljYXRpb24gPSB7CiAgICBuYW1lOiAiTG93ZXIgQ2FzZSBBY3Rpb24iLAogICAgZGVzY3JpcHRpb246ICJUcmFuc2Zvcm0gYSBzdHJpbmcgdG8gbG93ZXIgY2FzZSIsCiAgICB0eXBlOiBTdHJlYW1Ob2RlU3BlY2lmaWNhdGlvblR5cGUuQUNUSU9OLAogICAgcGFja2FnZTogU3RyZWFtTm9kZVNwZWNpZmljYXRpb25QYWNrYWdlLkNPUkUsCiAgICBjYXRlZ29yeTogU3RyZWFtTm9kZVNwZWNpZmljYXRpb25DYXRlZ29yeS5TVFJJTkcsCiAgICB2ZXJzaW9uOiB7CiAgICAgIG1ham9yOiAxLAogICAgICBtaW5vcjogMCwKICAgICAgcGF0Y2g6IDAsCiAgICAgIGNoYW5nZWxvZzpbXSwKICAgIH0sCiAgICBhdXRob3I6IHsKICAgICAgbmFtZTogIlNldmVyaW4gU2llYmVydHoiLAogICAgICBjb21wYW55OiAiTW9vdklUIEdtYkgiLAogICAgICBlbWFpbDogInMuc2llYmVydHpAbW9vdml0LmRlIiwKICAgIH0sCiAgICBpbnB1dHM6IFsKICAgICAgewogICAgICAgIG5hbWU6ICJTdHJpbmciLAogICAgICAgIGRlc2NyaXB0aW9uOiAiVGhlIHN0cmluZyB0byBsb3dlciBjYXNlIiwKICAgICAgICB0eXBlOiBTdHJlYW1Ob2RlU3BlY2lmaWNhdGlvbklucHV0T3V0cHV0VHlwZS5TVFJJTkcsCiAgICAgICAgZXhhbXBsZTogIkZPTy1CQVIiLAogICAgICAgIG1hbmRhdG9yeTogdHJ1ZSwKICAgICAgfSwKICAgIF0sCiAgICBvdXRwdXRzOiBbCiAgICAgIHsKICAgICAgICBuYW1lOiAiU3RyaW5nIiwKICAgICAgICBkZXNjcmlwdGlvbjogIlRoZSBsb3dlciBjYXNlZCBzdHJpbmciLAogICAgICAgIHR5cGU6IFN0cmVhbU5vZGVTcGVjaWZpY2F0aW9uSW5wdXRPdXRwdXRUeXBlLlNUUklORywKICAgICAgICBleGFtcGxlOiAiZm9vLWJhciIsCiAgICAgIH0sCiAgICBdLAogIH07CgogIGFzeW5jIGV4ZWN1dGUoKTogUHJvbWlzZTx2b2lkPiB7CiAgICBjb25zdCByZXN1bHQgPSB0aGlzLmZpbmRJbnB1dCgKICAgICAgdGhpcy5nZXROb2RlU3BlY2lmaWNhdGlvbigpLmlucHV0cz8uWzBdCiAgICApPy52YWx1ZS50b0xvd2VyQ2FzZSgpOwoKICAgIHRoaXMuYWRkT3VwdXQodGhpcy5nZXROb2RlU3BlY2lmaWNhdGlvbigpLm91dHB1dHM/LlswXSwgcmVzdWx0KTsKICB9Cn0K";
            const typescript =
                "aW1wb3J0IHsKICBTdHJlYW1Ob2RlU3BlY2lmaWNhdGlvbiwKICBTdHJlYW1Ob2RlU3BlY2lmaWNhdGlvbkNhdGVnb3J5LAogIFN0cmVhbU5vZGVTcGVjaWZpY2F0aW9uSW5wdXRPdXRwdXRUeXBlLAogIFN0cmVhbU5vZGVTcGVjaWZpY2F0aW9uUGFja2FnZSwKICBTdHJlYW1Ob2RlU3BlY2lmaWNhdGlvblR5cGUsCn0gZnJvbSAiLi4vLi4vLi4vbW9kZWxzL1N0cmVhbU5vZGVTcGVjaWZpY2F0aW9uIjsKaW1wb3J0IEFjdGlvbk5vZGUgZnJvbSAiLi4vQWN0aW9uTm9kZSI7CgpleHBvcnQgZGVmYXVsdCBjbGFzcyBMb3dlckNhc2VBY3Rpb24gZXh0ZW5kcyBBY3Rpb25Ob2RlIHsKICBwcm90ZWN0ZWQgc3BlY2lmaWNhdGlvbjogU3RyZWFtTm9kZVNwZWNpZmljYXRpb24gPSB7CiAgICBuYW1lOiAiTG93ZXIgQ2FzZSBBY3Rpb24iLAogICAgZGVzY3JpcHRpb246ICJUcmFuc2Zvcm0gYSBzdHJpbmcgdG8gbG93ZXIgY2FzZSIsCiAgICB0eXBlOiBTdHJlYW1Ob2RlU3BlY2lmaWNhdGlvblR5cGUuQUNUSU9OLAogICAgcGFja2FnZTogU3RyZWFtTm9kZVNwZWNpZmljYXRpb25QYWNrYWdlLkNPUkUsCiAgICBjYXRlZ29yeTogU3RyZWFtTm9kZVNwZWNpZmljYXRpb25DYXRlZ29yeS5TVFJJTkcsCiAgICB2ZXJzaW9uOiB7CiAgICAgIG1ham9yOiAxLAogICAgICBtaW5vcjogMCwKICAgICAgcGF0Y2g6IDAsCiAgICAgIGNoYW5nZWxvZzpbXSwKICAgIH0sCiAgICBhdXRob3I6IHsKICAgICAgbmFtZTogIlNldmVyaW4gU2llYmVydHoiLAogICAgICBjb21wYW55OiAiTW9vdklUIEdtYkgiLAogICAgICBlbWFpbDogInMuc2llYmVydHpAbW9vdml0LmRlIiwKICAgIH0sCiAgICBpbnB1dHM6IFsKICAgICAgewogICAgICAgIG5hbWU6ICJTdHJpbmciLAogICAgICAgIGRlc2NyaXB0aW9uOiAiVGhlIHN0cmluZyB0byBsb3dlciBjYXNlIiwKICAgICAgICB0eXBlOiBTdHJlYW1Ob2RlU3BlY2lmaWNhdGlvbklucHV0T3V0cHV0VHlwZS5TVFJJTkcsCiAgICAgICAgZXhhbXBsZTogIkZPTy1CQVIiLAogICAgICAgIG1hbmRhdG9yeTogdHJ1ZSwKICAgICAgfSwKICAgIF0sCiAgICBvdXRwdXRzOiBbCiAgICAgIHsKICAgICAgICBuYW1lOiAiU3RyaW5nIiwKICAgICAgICBkZXNjcmlwdGlvbjogIlRoZSBsb3dlciBjYXNlZCBzdHJpbmciLAogICAgICAgIHR5cGU6IFN0cmVhbU5vZGVTcGVjaWZpY2F0aW9uSW5wdXRPdXRwdXRUeXBlLlNUUklORywKICAgICAgICBleGFtcGxlOiAiZm9vLWJhciIsCiAgICAgIH0sCiAgICBdLAogIH07CgogIGFzeW5jIGV4ZWN1dGUoKTogUHJvbWlzZTx2b2lkPiB7CiAgICBjb25zdCByZXN1bHQgPSB0aGlzLmZpbmRJbnB1dCgKICAgICAgdGhpcy5nZXROb2RlU3BlY2lmaWNhdGlvbigpLmlucHV0cz8uWzBdCiAgICApPy52YWx1ZS50b0xvd2VyQ2FzZSgpOwoKICAgIHRoaXMuYWRkT3VwdXQodGhpcy5nZXROb2RlU3BlY2lmaWNhdGlvbigpLm91dHB1dHM/LlswXSwgcmVzdWx0KTsKICB9Cn0K";

            return hcloudClient.High5.node
                .createNode(NodeCategory.CUSTOM, specification, typescript, stream._id)
                .then((resp: Node) => {
                    expect(resp.organizationId).to.equal(user.activeOrganizationId);
                    expect(resp.appId).to.equal(app._id);
                    expect(resp.eventId).to.equal(event._id);
                    expect(resp.streamId).to.equal(stream._id);
                    expect(resp.userId).to.equal(user._id);
                    expect(resp.secret.length).to.equal(128);
                    node = resp;
                })
                .catch((err: AxiosError) => {
                    throw err;
                });
        });

        it("Get nodes OK", () => {
            return hcloudClient.High5.node
                .getNodes(stream._id)
                .then((resp: Node[]) => {
                    expect(resp[0].streamId).to.equal(stream._id);
                })
                .catch((err: AxiosError) => {
                    throw err;
                });
        });

        it("Get node by id OK", () => {
            return hcloudClient.High5.node
                .getNodeById(node._id)
                .then((resp: Node) => {
                    expect(resp._id).to.equal(node._id);
                })
                .catch((err: AxiosError) => {
                    throw err;
                });
        });

        it("Patch node by id OK", () => {
            const typescript =
                "aW1wb3J0IHsKICBTdHJlYW1Ob2RlU3BlY2lmaWNhdGlvbiwKICBTdHJlYW1Ob2RlU3BlY2lmaWNhdGlvbkNhdGVnb3J5LAogIFN0cmVhbU5vZGVTcGVjaWZpY2F0aW9uSW5wdXRPdXRwdXRUeXBlLAogIFN0cmVhbU5vZGVTcGVjaWZpY2F0aW9uUGFja2FnZSwKICBTdHJlYW1Ob2RlU3BlY2lmaWNhdGlvblR5cGUsCn0gZnJvbSAiLi4vLi4vLi4vbW9kZWxzL1N0cmVhbU5vZGVTcGVjaWZpY2F0aW9uIjsKaW1wb3J0IEFjdGlvbk5vZGUgZnJvbSAiLi4vQWN0aW9uTm9kZSI7CgpleHBvcnQgZGVmYXVsdCBjbGFzcyBMb3dlckNhc2VBY3Rpb24gZXh0ZW5kcyBBY3Rpb25Ob2RlIHsKICBwcm90ZWN0ZWQgc3BlY2lmaWNhdGlvbjogU3RyZWFtTm9kZVNwZWNpZmljYXRpb24gPSB7CiAgICBuYW1lOiAiTG93ZXIgQ2FzZSBBY3Rpb24iLAogICAgZGVzY3JpcHRpb246ICJUcmFuc2Zvcm0gYSBzdHJpbmcgdG8gbG93ZXIgY2FzZSIsCiAgICB0eXBlOiBTdHJlYW1Ob2RlU3BlY2lmaWNhdGlvblR5cGUuQUNUSU9OLAogICAgcGFja2FnZTogU3RyZWFtTm9kZVNwZWNpZmljYXRpb25QYWNrYWdlLkNPUkUsCiAgICBjYXRlZ29yeTogU3RyZWFtTm9kZVNwZWNpZmljYXRpb25DYXRlZ29yeS5TVFJJTkcsCiAgICB2ZXJzaW9uOiB7CiAgICAgIG1ham9yOiAxLAogICAgICBtaW5vcjogMCwKICAgICAgcGF0Y2g6IDAsCiAgICAgIGNoYW5nZWxvZzpbXSwKICAgIH0sCiAgICBhdXRob3I6IHsKICAgICAgbmFtZTogIlNldmVyaW4gU2llYmVydHoiLAogICAgICBjb21wYW55OiAiTW9vdklUIFNQIEdtYkgiLAogICAgICBlbWFpbDogInMuc2llYmVydHpAbW9vdml0LXNwLmNvbSIsCiAgICB9LAogICAgaW5wdXRzOiBbCiAgICAgIHsKICAgICAgICBuYW1lOiAiU3RyaW5nIiwKICAgICAgICBkZXNjcmlwdGlvbjogIlRoZSBzdHJpbmcgdG8gbG93ZXIgY2FzZSIsCiAgICAgICAgdHlwZTogU3RyZWFtTm9kZVNwZWNpZmljYXRpb25JbnB1dE91dHB1dFR5cGUuU1RSSU5HLAogICAgICAgIGV4YW1wbGU6ICJUaGlzIGlzIGFuIGV4YW1wbGUiLAogICAgICAgIG1hbmRhdG9yeTogdHJ1ZSwKICAgICAgfSwKICAgIF0sCiAgICBvdXRwdXRzOiBbCiAgICAgIHsKICAgICAgICBuYW1lOiAiU3RyaW5nIiwKICAgICAgICBkZXNjcmlwdGlvbjogIlRoZSBsb3dlciBjYXNlZCBzdHJpbmciLAogICAgICAgIHR5cGU6IFN0cmVhbU5vZGVTcGVjaWZpY2F0aW9uSW5wdXRPdXRwdXRUeXBlLlNUUklORywKICAgICAgICBleGFtcGxlOiAiZm9vLWJhciIsCiAgICAgIH0sCiAgICBdLAogIH07CgogIGFzeW5jIGV4ZWN1dGUoKTogUHJvbWlzZTx2b2lkPiB7CiAgICBjb25zdCByZXN1bHQgPSB0aGlzLmZpbmRJbnB1dCgKICAgICAgdGhpcy5nZXROb2RlU3BlY2lmaWNhdGlvbigpLmlucHV0cz8uWzBdCiAgICApPy52YWx1ZS50b0xvd2VyQ2FzZSgpOwoKICAgIHRoaXMuYWRkT3VwdXQodGhpcy5nZXROb2RlU3BlY2lmaWNhdGlvbigpLm91dHB1dHM/LlswXSwgcmVzdWx0KTsKICB9Cn0K";
            return hcloudClient.High5.node
                .patchNode(node._id, true, typescript, typescript)
                .then((resp: Node) => {
                    expect(resp.secret).to.not.equal(node.secret);
                    node = resp;
                })
                .catch((err: AxiosError) => {
                    throw err;
                });
        });

        it("Get node content OK", () => {
            return hcloudClient.High5.node
                .getNodeContent(node.secret)
                .then((resp: string) => {
                    expect(resp.length).greaterThan(0);
                })
                .catch((err: AxiosError) => {
                    throw err;
                });
        });

        it("Delete node OK", () => {
            return hcloudClient.High5.node
                .deleteNodeById(node._id)
                .then(resp => {
                    expect(resp).to.be.undefined;
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
