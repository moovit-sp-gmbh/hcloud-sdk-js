import { ReducedSpace } from "../../../global";
import { ReducedOrganization, ReducedUser } from "../../../idp";

export type Pool = {
    _id: string;
    organization: ReducedOrganization;
    space: ReducedSpace;
    creator: ReducedUser;

    name: string;
    targets: string[];
};

export type PoolChange = Pool & { invalidTargets: { notMember: string[] } };

export type PoolTargetPatch = {
    identifiers: string[];
    operation: ArrayOperation;
};

export enum ArrayOperation {
    ADD = "ADD",
    REPLACE = "REPLACE",
    REMOVE = "REMOVE",
}
