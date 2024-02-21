import { ReducedOrganization } from "../../idp";

export interface Context {
    uuid: string;
    email: string;
    server: string;
    enabled: boolean;
    connections: (ActiveConnection | InactiveConnection)[];
    busy: boolean;
}

export type ActiveConnection = {
    connected: true;
    organization: ReducedOrganization;
    runningStreams: string[];
};

export type InactiveConnection = {
    connected: false;
    organization: ReducedOrganization;
    cause: string;
};
