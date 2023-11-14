import { ReducedOrganization } from "../organization";

export interface ConnectionSettings {
    connections: (ReducedOrganization & { connect: boolean })[];
}
