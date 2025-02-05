import { ReducedSpace } from "../../../global";
import { ReducedOrganization, ReducedUser, TeamUsersPatchOperation } from "../../../idp";

export type Pool = {
    _id: string;
    organization: ReducedOrganization;
    space: ReducedSpace;
    creator: ReducedUser;

    name: string;
    avatarUrl: string;

    numberOfTargets?: number;
    targetSample?: ReducedUser[];

    createDate: number;
    modifyDate: number;
};

export type PoolChange = Pool & { targets: ReducedUser[]; invalidTargets: { notMember: string[] } };

export type PoolTargetPatch = {
    identifiers: string[];
    operation: TeamUsersPatchOperation;
};

export type PoolQueryOptions = {
    getTargetsSample?: number; // Number of targets to return
    getTotalTargetCount?: boolean;
};
